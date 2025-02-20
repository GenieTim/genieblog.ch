@extends('_layouts.main')

@push('meta')
<meta property="og:title" content="{{ $page->title }}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="{{ $page->getUrl() }}" />
<meta property="og:description" content="{{ $page->description }}" />
@endpush

@section('body')
@if ($page->cover_image)
@include('_components.img', ['alt' => $page->title . 'cover image', 'src' => $page->cover_image ])
@endif

<h1 class="leading-none mb-2">{{ $page->title }}</h1>

<!-- <p class="text-gray-500 text-xl md:mt-0">{{ $page->author }} • {{ date('F j, Y', $page->date) }}</p> -->

@if($page->draft)
<div class="alert"><p>
    This page is a draft and will change soonish.    
</p></div>
@endif

<div class="border-b border-secondary mb-10 pb-4" v-pre>
    @yield('content')
</div>
@endsection
