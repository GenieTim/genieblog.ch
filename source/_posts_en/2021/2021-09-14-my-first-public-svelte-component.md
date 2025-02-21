---
author: Tim Bernhard
categories:
  - Svelte
  - JavaScript
cover_image: false
canonical_url: https://www.genieblog.ch/blog/en/2021/my-first-public-svelte-component
date: 2021-09-14 11:51:40
description: false
draft: false
extends: _layouts.post
language: en
layout: post
slug: my-first-public-svelte-component
social_image: false
template: post
title: "svelte-virtual-table: my first (public) Svelte Component"
translations:
  en: my-first-public-svelte-component
  de: meine-erste-offentliche-svelte-komponente
---

I just published my first public Svelte component.
The component represents a virtual, sortable table and is aptly named `svelte-virtual-table`.

The general idea of a virtual list or table is, that instead of rendering all data, just the bits that are visible are rendered.
This should keep the page using it nice, light and performant.

Find the component on:

- [GitHub](https://github.com/BernhardWebstudio/svelte-virtual-table)
- [npmjs.com](https://www.npmjs.com/package/svelte-virtual-table)

## Notes on Difficulties I Had

One of the objectives was to use native HTML `<table>`, `<thead>`, `<tbody>` etc.
As these are not block-type elements, the original intention to use padding as a means to indicate the table's "scrollability" of the inner table is not possible in a straight-forward manner, as it would not be applied at all by default.

There are numerous workarounds, that were attempted:

- apply a border to `<tbody>`,
- use `::before`- and `::after`-pseudo elements,
- increase the height of `<tbody>`'s last- and first-child,
- use `display: block` on `<table>` and `display: table` on `<tbody>, <tfoot>, <thead>`
- or use `<tfoot>` and `<thead>` as the elements whose height is changed (and which are kept in the document, no matter if they even have content).

As an example, the pseudo-element approach would work e.g. like this:

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

Unfortunately, with the first three workarounds, when scrolling down, it could happen that the table continued scrolling without user intervention (though the scrolling can be stopped manually).
This esd not the case when scrolling up.

The final workaround mentioned above showed similar behaviour, though its deviations seemed more predictable then the others.
This made it easier to pinpoint the problem's origin.
The reason was with high probability, that the current calculations were incorrect.
Refer to [this codepen](https://codepen.io/BernhardWebstudio/pen/NWggLyG) for some calculation-analysis possibilities.

The fourth workaround worked without further issues concerning the scrolling behaviour.
BUT: the styling cannot be done arbitrarily.
When the table has `display` set to `block` and the padding of the `<tbody>` is used for the scroll length, the new table (`<tbody>` with `display: table`) cannot accept a `border-collapse: collapse` style, as otherwise, the scrolling behaviour is nonexistent.

That is why, you, as a user, have the choice between two methods:
You can pass the prop `requireBorderCollapse` with a value that evaluates to true if you want the method using `<tfoot>` and `<thead>` heights, and a value that evaluates to false if you want to use a table being set to `display: block` and `tbody`'s padding.

```svelte
<VirtualTable
    requireBorderCollapse=false
      ...
```

If you find the issue in the calculations the component does, please open a corresponding [issue in GitHub](https://github.com/BernhardWebstudio/svelte-virtual-table/issues/new) to hopefully some day permanently switch to the method supporting `border-collapse`.
Otherwise, if people actually use this component and the calculation issue is not found, I might have to disregard my intentions to use native `<table>` etc. and instead switch to using `<div>`s or similar.

## Instructions

In the following, I list the usage of the component as it works currently, at the time of writing this post.
Please refer to the [README](https://github.com/BernhardWebstudio/svelte-virtual-table#readme) for possibly more current instructions.

### Installation

Install this component using

```bash
yarn install svelte-virtual-table
```

or

```bash
npm install svelte-virtual-table
```

, respectively.

### Useage

You can then, after the installation, import it in your app:

```js
import VirtualTable from "svelte-virtual-table";
```

and use it, for example like so:

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

Pay attention to the `role` attributes: those are highly recommended if you want to have the table behave as such also in accessibility contexts.
While this is not necessarily needed for ordinary tables, this one is required to use `display: block` on the table element ([see Development Notes](https://github.com/BernhardWebstudio/svelte-virtual-table#development-notes)), which in turn makes these role attributes necessary, still.

You can find an example-app in the [GitHub Repo](https://github.com/BernhardWebstudio/svelte-virtual-table/).
