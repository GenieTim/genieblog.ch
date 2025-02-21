---
author: Tim Bernhard
categories:
  - Svelte
  - JavaScript
cover_image: false
canonical_url: https://www.genieblog.ch/blog/de/2021/meine-erste-offentliche-svelte-komponente
date: 2021-09-14 11:51:40
description: false
draft: false
extends: _layouts.post
language: de
layout: post
slug: meine-erste-offentliche-svelte-komponente
social_image: false
template: post
title: "Meine erste (öffentliche) Svelte Komponente"
translations:
  en: my-first-public-svelte-component
  de: meine-erste-offentliche-svelte-komponente
---

Ich habe gerade meine erste öffentliche Svelte-Komponente veröffentlicht.
Die Komponente stellt eine virtuelle, sortierbare Tabelle dar und trägt den passenden Namen `svelte-virtual-table`.

Die allgemeine Idee einer virtuellen Liste oder Tabelle ist, dass anstatt alle Daten zu rendern, nur die Bits gerendert werden, die sichtbar sind.
Dies sollte die Seite, die die Komponente verwendet, schön leicht und performant halten.

Finden Sie die Komponente auf:

- [GitHub](https://github.com/BernhardWebstudio/svelte-virtual-table)
- [npmjs.com](https://www.npmjs.com/package/svelte-virtual-table)

## Anmerkungen zu Schwierigkeiten, die ich hatte bei der Entwicklung

Eines der Ziele war die Verwendung von nativem HTML `<table>`, `<thead>`, `<tbody>` etc.
Da es sich nicht um blockartige Elemente handelt, ist die ursprüngliche Absicht, `padding` als Mittel zur Angabe der "Scrollbarkeit" der inneren Tabelle der Tabelle zu verwenden, nicht auf einfache Weise möglich, da `padding` standardmäßig überhaupt nicht angewendet würde.

Es gibt zahlreiche Workarounds, die ich versucht hatte:

- Anwenden eines Rahmens auf `<tbody>`,
- gebrauchen `::before`- und `::after`-Pseudoelemente,
- erhöhen Sie die Höhe von `<tbody>`'s letztes und erstes Kind,
- gebrauchen `display: block` auf `<table>` und `display: table` auf `<tbody>, <tfoot>, <thead>`
- oder verwenden `<tfoot>` und `<thead>` als die Elemente, deren Höhe geändert wird (und die im Dokument beibehalten werden, egal ob sie überhaupt Inhalt haben).

Als Beispiel würde der Pseudoelementansatz z.B. so funktionieren:

```css
tbody::before {
  box-sizing: border-box;
  content: " ";
  display: block;
  height: var(--p-top);
}
tbody::after {
  box-sizing: border-box;
  content: " ";
  display: block;
  height: var(--p-bottom);
}
```

Leider kann es bei den ersten drei Workarounds beim Scrollen nach unten vorkommen, dass die Tabelle ohne Benutzereingriff weiter scrollt (obwohl das Scrollen manuell gestoppt werden kann).
Dies ist beim Scrollen nach oben nicht der Fall.

Die letzte oben erwähnte Problemumgehung zeigte ein ähnliches Verhalten, obwohl ihre Abweichungen vorhersehbarer schienen als die anderen.
Dies machte es einfacher, den Ursprung des Problems zu lokalisieren.
Der Grund war mit hoher Wahrscheinlichkeit, dass die aktuellen Berechnungen falsch waren.
Referenzieren [Dieser Codepen](https://codepen.io/BernhardWebstudio/pen/NWggLyG) für einige Berechnungs-Analyse-Möglichkeiten.

Der vierte Workaround funktionierte ohne weitere Probleme bezüglich des Scrollverhaltens.
ABER: Das Styling kann nicht willkürlich erfolgen.
Wenn die Tabelle `display` setzen auf `block` und die Polsterung der `<tbody>` wird für die Bildlauflänge verwendet, die neue Tabelle (`<tbody>` mit `display: table`) kann eine `border-collapse: collapse` Stil, da sonst das Scrollverhalten nicht vorhanden ist.

Deshalb haben Sie als Benutzer die Wahl zwischen zwei Methoden:
Sie können die Requisite übergeben `requireBorderCollapse` mit einem Wert, der als true ausgewertet wird, wenn sie die Methode mit `<tfoot>` und `<thead>` Heights und einen Wert, der als false ausgewertet wird, wenn Sie eine Tabelle verwenden möchten, die auf `display: block` und `tbody`'s Polsterung.

```svelte
<VirtualTable
    requireBorderCollapse=false
      ...
```

Wenn Sie das Problem in den Berechnungen der Komponente finden, öffnen Sie bitte ein entsprechendes [Issue in GitHub](https://github.com/BernhardWebstudio/svelte-virtual-table/issues/new), um hoffentlich eines Tages dauerhaft auf die Methode umzusteigen, die `border-collapse` unterstützt.
Andernfalls, wenn Leute diese Komponente tatsächlich verwenden und das Berechnungsproblem nicht gefunden wird, muss ich möglicherweise meine Absichten ignorieren, native zu verwenden `<table>` usw. und wechseln Sie stattdessen zur Verwendung `<div>`s oder ähnliches.

## Anweisungen

Im Folgenden liste ich die Verwendung der Komponente auf, wie sie zum Zeitpunkt des Schreibens dieses Beitrags funktioniert.
Bitte beachten Sie die [README-DATEI](https://github.com/BernhardWebstudio/svelte-virtual-table#readme) für eventuell aktuellere Anleitungen.

### Installation

Installieren Sie diese Komponente mit

```bash
yarn install svelte-virtual-table
```

oder

```bash
npm install svelte-virtual-table
```

beziehungsweise.

### Nutzung

Sie können es dann nach der Installation in Ihre App importieren:

```js
import VirtualTable from "svelte-virtual-table";
```

und verwenden Sie es, zum Beispiel so:

```js
let myItemsArray = [];

async function getData() {
  let dataItems = [];
  for (let page = 1; page < 5; page++) {
    let res = await fetch(`https://node-hnapi.herokuapp.com/news?page=${page}`);
    let data = await res.json();
    dataItems = dataItems.concat(data);
  }
  items = dataItems;
  return items;
}

const dataPromise = getData();

// TWO variables that can be bound to the VirtualTable
let start; // the index of the first visible item
let end; // the index of the last visible item
```

```svelte
{#await dataPromise}
    Loading...
{:then}
    <VirtualTable
        items={myItemsArray}
        class="anyClassIWantToAdd"
        bind:start
        bind:end
    >
        <tr slot="thead" role="row">
            <th data-sort="title">Title</th>
            <th data-sort="user">User</th>
            <th data-sort="domain">Domain</th>
            <th data-sort="time" data-sort-initial="descending">Time ago</th>
            <th data-sort="comments_count">Comments</th>
        </tr>
        <tr slot="tbody" role="row" let:item>
            <td>
                <a href={item.url} target="_blank">{item.title}</a>
            </td>
            <td>{item.user}</td>
            <td>{item.domain}</td>
            <td>{item.time_ago}</td>
            <td>{item.comments_count}</td>
        </tr>
    </VirtualTable>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
```

Achten Sie auf die `role` Attribute: Diese werden dringend empfohlen, wenn Sie möchten, dass sich die Tabelle auch in Kontexten der Barrierefreiheit als eine solche verhält.
Während dies für gewöhnliche Tabellen nicht unbedingt erforderlich ist, ist dies hier leider erforderlich, weil `display: block` auf das table-Element angewendet wird ([siehe Development Notes](https://github.com/BernhardWebstudio/svelte-virtual-table#development-notes)).

Eine Beispiel-App finden Sie im [GitHub-Repo](https://github.com/BernhardWebstudio/svelte-virtual-table/).
