@extends('_layouts.main')

@push('meta')
<meta property="og:title" content="{{ $page->title }}" />
<meta property="og:type" content="website" />
<meta property="og:url" content="{{ $page->getUrl() }}" />
<meta property="og:description" content="{{ $page->description }}" />
@endpush

@section('body')
<h1>{{ $page->title }}</h1>

<div class="text-2xl border-b border-secondary mb-6 pb-10">
    @yield('content')
</div>

@foreach ($page->posts(${'posts_' . $page->language}) as $post)
@include('_components.post-preview-inline')

@if (! $loop->last)
<hr class="w-full border-b mt-2 mb-6">
@endif
@endforeach

@stop
