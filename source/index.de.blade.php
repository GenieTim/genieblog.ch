---
extends: _layouts.master
language: de
---

@section('hero')
<!-- landing page -->
<div class="w-full hero">
    <div class="circuit w-full absolute">
        <h1>Entwickler</h1>
    </div>
    <div class="split w-full absolute">
        <h1>&</h1>
    </div>
    <div class="graphene w-full absolute">
        <h1>Chemiker</h1>
    </div>
</div>
@endsection


@section('body')

<!-- about this site -->

<div class="w-full mb-6">
    Dies ist die persönliche Website von mir, <a href="{{ $page->baseUrl }}/pages/en/about#Tim+Bernhard">Tim
        Bernhard</a>.
    Ich benutze diese Website hauptsächlich, um im Blog zu veröffentlichen, was mir bei einer Suche im Web gefehlt hat:
    was auch immer mir bei der Lösung eines Problems half, was ich mir gewünscht habe und die Lösungen, die ich
    schlussendlich fand.
    Manchmal handelt es sich bei dem Inhalt nur um einige Ideen, einen kurzen Code-Ausschnitt und manchmal um ein etwas
    längeres Tutorial.
    Ich bitte Sie, den Inhalt nicht als Beispiel für meine technischen Schreibfähigkeiten zu verwenden - wenn es nötig
    ist, mich zu beurteilen, bitte Ich Sie, den Blog eher als Beispiel für Dinge zu sehen, die mich interessieren.
    Aber auch dann würde ich eher empfehlen, meinen Lebenslauf <a href="mailto:tim@genieblog.ch"
        title="Tim kontaktieren">anzufragen</a>,
    meinen <a href="https://github.com/genietim/" title="Tim's GitHub account">GitHub account</a>
    oder die <a href="https://www.bernhard-webstudio.ch//projects" title="Tim's Projects for clients">Projekte</a>, die
    ich
    für Klienten umsetzten durfte, anzuschauen.
</div>
<hr class="border-b my-6" />

<!-- featured posts -->
<div class="w-full mb-6">
    <h1>Aus dem <a title="Zum Blog"
            href="{{$page->baseUrl}}/blog/{{$page->language}}/index.{{$page->language}}">Blog</a></h1>
</div>
<hr class="border-b my-6">

@foreach ($posts_de->where('featured', true) as $featuredPost)
<div class="w-full mb-6">
    @if ($featuredPost->cover_image)
    <img src="{{ $featuredPost->cover_image }}" alt="{{ $featuredPost->title }} cover image" class="mb-6">
    @endif

    <p class="text-gray-500 font-medium my-2">
        {{ $featuredPost->getDate()->format('F j, Y') }}
    </p>

    <h2 class="text-3xl mt-0">
        <a href="{{ $featuredPost->getUrl() }}" title="Lesen: {{ $featuredPost->title }}" class="font-extrabold">
            {{ $featuredPost->title }}
        </a>
    </h2>

    <p class="mt-0 mb-4">{!! $featuredPost->getExcerpt() !!}</p>

    <a href="{{ $featuredPost->getUrl() }}" title="Lesen: {{ $featuredPost->title }}"
        class="uppercase tracking-wide mb-4">
        Lesen
    </a>
</div>

@if (! $loop->last)
<hr class="border-b my-6">
@endif
@endforeach

@foreach ($posts_de->where('featured', false)->take(6)->chunk(2) as $row)
<div class="flex flex-col md:flex-row md:-mx-6">
    @foreach ($row as $post)
    <div class="w-full md:w-1/2 md:mx-6">
        @include('_components.post-preview-inline')
    </div>

    @if (! $loop->last)
    <hr class="block md:hidden w-full border-b mt-2 mb-6">
    @endif
    @endforeach
</div>

@if (! $loop->last)
<hr class="w-full border-b mt-2 mb-6">
@endif
@endforeach
<p>
    Alle Beiträge finden sich im <a title="{{ $page->siteName }} Blog"
        href="{{$page->baseUrl}}/blog/{{$page->language}}/index.{{$page->language}}">Blog</a>!
</p>
@stop
