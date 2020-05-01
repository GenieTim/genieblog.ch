---
extends: _layouts.master
language: en
---

@section('hero')

<!-- landing page -->
<div class="w-full hero">
    {{-- <div class="page-0">
        <h1>Welcome on genieblog.ch</h1>
    </div>
    <div class="page-1">
        <h2>Tim Bernhard's personal Website</h2>
    </div>
    <div class="page-2">
        <h1>Tim is a</h1>
    </div>
    <div class="page-3"> --}}
    <div class="circuit w-full absolute">
        <h1>Developer</h1>
    </div>
    <div class="split w-full absolute">
        <h1>&</h1>
    </div>
    <div class="graphene w-full absolute">
        <h1>Chemist</h1>
    </div>
    {{-- </div> --}}
</div>
@stop

@section('body')

<!-- about this site -->
<div class="w-full mb-6">
    This is the personal website of me, <a href="{{ $page->baseUrl }}/pages/en/about#Tim+Bernhard">Tim Bernhard</a>.
    I use this website mainly to publish in the blog whatever I was missing when searching the web,
    whatever advice and ideas I wished for or got when solving a problem.
    Sometimes, the content is just some ideas, a short code snippet, and sometimes a slightly longer tutorial.
    I kindly as you to not use the content as an exemple of my technical writing skills – if it has to be used to
    assess me, please see it rather as an example of things I am interested in. But even then,
    I would kindly suggest you rather <a href="mailto:tim@genieblog.ch" title="contact Tim">ask</a> for my CV,
    checkout my <a href="https://github.com/genietim/" title="Tims GitHub account">GitHub account</a>
    or the <a href="https://bernhard-webstudio.ch/projects" title="Tims Projects for clients">projects</a> I do for
    clients.
</div>
<hr class="border-b my-6" />

<!-- featured posts -->
<div class="w-full mb-6">
    <h1>From the <a title="To the blog"
            href="{{$page->baseUrl}}/blog/{{$page->language}}/index.{{$page->language}}">Blog</a></h1>
</div>

@foreach ($posts_en->where('featured', true) as $featuredPost)
<div class="w-full mb-6">
    @if ($featuredPost->cover_image)
    <img src="{{ $featuredPost->cover_image }}" alt="{{ $featuredPost->title }} cover image" class="mb-6">
    @endif

    <p class="text-gray-500 font-medium my-2">
        {{ $featuredPost->getDate()->format('F j, Y') }}
    </p>

    <h2 class="text-3xl mt-0">
        <a href="{{ $featuredPost->getUrl() }}" title="Read {{ $featuredPost->title }}" class="font-extrabold">
            {{ $featuredPost->title }}
        </a>
    </h2>

    <p class="mt-0 mb-4">{!! $featuredPost->getExcerpt() !!}</p>

    <a href="{{ $featuredPost->getUrl() }}" title="Read - {{ $featuredPost->title }}"
        class="uppercase tracking-wide mb-4">
        Read
    </a>
</div>

@if (! $loop->last)
<hr class="border-b my-6">
@endif
@endforeach

<!-- non-featured posts -->
@foreach ($posts_en->where('featured', false)->take(6)->chunk(2) as $row)
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
    All posts can be found in the <a title="{{ $page->siteName }} Blog"
        href="{{$page->baseUrl}}/blog/{{$page->language}}/index.{{$page->language}}">blog</a>!
</p>

@stop
