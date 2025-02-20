---
title: Blog posts
pagination:
  collection: posts_en
  perPage: 16
extends: _layouts.main
---

@push('meta')
<meta property="og:title" content="{{ $page->siteName }} Blog" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{{ $page->getUrl() }}" />
<meta property="og:description" content="The list of blog posts for {{ $page->siteName }}" />
@endpush

@section('body')
<h1>Blog</h1>

<hr class="border-b my-6">

@foreach ($pagination->items as $post)
@include('_components.post-preview-inline')

@if ($post != $pagination->items->last())
<hr class="border-b my-6">
@endif
@endforeach

@if ($pagination->pages && $pagination->pages->count() > 1)
<nav class="flex text-base my-8">
    @if ($previous = $pagination->previous)
    <a href="{{ $page->baseUrl }}{{ $previous }}" title="Previous Page"
        class="bg-gray-800 hover:bg-gray-900 rounded mr-3 px-5 py-3">&LeftArrow;</a>
    @endif

    @foreach ($pagination->pages as $pageNumber => $path)
    <a href="{{ $page->baseUrl }}{{ $path }}" title="Zu Seite {{ $pageNumber }}"
        class="bg-gray-800 hover:bg-gray-900 text-primary rounded mr-3 px-5 py-3 {{ $pagination->currentPage == $pageNumber ? 'text-secondary' : '' }}">{{ $pageNumber }}</a>
    @endforeach

    @if ($next = $pagination->next)
    <a href="{{ $page->baseUrl }}{{ $next }}" title="Nächste Seite"
        class="bg-gray-800 hover:bg-gray-900 rounded mr-3 px-5 py-3">&RightArrow;</a>
    @endif
</nav>
@endif
@stop
