@extends('_layouts.master')

@push('meta')
<meta property="og:title" content="{{ $page->title }}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="{{ $page->getUrl() }}" />
<meta property="og:description" content="{{ $page->description }}" />
@endpush

@section('body')
@if ($page->cover_image)
<img src="{{ $page->cover_image }}" alt="{{ $page->title }} cover image" class="mb-2">
@endif

<h1 class="leading-none mb-2">{{ $page->title }}</h1>

<p class="text-gray-700 text-xl md:mt-0">{{ $page->author }} • {{ date('F j, Y', $page->date) }}</p>

<div class="border-b border-blue-200 mb-10 pb-4" v-pre>
    @yield('content')
</div>
@endsection
