@extends('_layouts.master')

@push('meta')
<meta property="og:title" content="{{ $page->title }}" />
<meta property="og:type" content="article" />
<meta property="og:url" content="{{ $page->getUrl() }}" />
<meta property="og:description" content="{{ $page->description }}" />
@if ($page->socialImage)
<meta property="og:image" content="{{$page->baseUrl}}/assets/images/{{ $page->socialImage }}" />
@elseif ($page->cover_image)
<meta property="og:image" content="{{$page->baseUrl}}/assets/images/{{ $page->cover_image }}" />
@endif

@endpush

@section('body')
@if ($page->cover_image)
@include('_components.img', ['alt' => $page->title . 'cover image', 'src' => $page->cover_image, 'classes' => 'mb-6' ])
@endif

<article class="h-entry">
    <h1 class="leading-none mb-2 p-entry-title p-name">{{ $page->title }}</h1>

    <p class="text-primary-shade font-thin text-xl md:mt-0">
        <a class="h-card p-author"
            href="{{$page->baseUrl}}/pages/{{$page->language}}/about#{{ urlencode($page->author) }}">
            {{ $page->author }}
        </a>
        • <time datetime="{{ date('c', $page->date) }}" title="Date Published"
            class="dt-published">{{ date('F j, Y', $page->date) }}</time>
        @if (isset($post->updated))
        • <time datetime="{{ date('c', $page->updated) }}" title="Date Updated"
            class="dt-updated">{{ date('F j, Y', $page->updated) }}</time>
        @endif
    </p>

    @if ($page->categories)
    @foreach ($page->categories as $i => $category)
    <a href="{{ $page->baseUrl . '/blog/' . $page->language . '/categories/' . $page->underscorify($category) }}"
        title="View posts in {{ $category }}" class="category-tag p-category">{{ $category }}</a>
    @endforeach
    @endif

    @if ($page->isOld())
    <div class="alert">
        <p>{{ $page->translate('page.note.old') }}</p>
        <p>{{ $page->translate('page.note.github') }} <a href="https://github.com/GenieTim/genieblog.ch"
                title="Source of genieblog.ch">GitHub</a></p>
    </div>
    @endif

    <div class="border-b border-secondary text-base e-content" v-pre>
        @yield('content')
    </div>
</article>

@if ($page->comments)
<!-- "comments" -->
<div class="border-b border-secondary mb-10 pb-4 pt-4 text-base">
    <details class="">
        @php
        // "memoization"
        $webmentions = $page->webmentions()
        @endphp
        <summary class="font-semibold">
            @if ($webmentions['count']['all'] != 0) {{ $webmentions['count']['all'] }} @endif
            @if ($webmentions['count']['all'] == 1)
            Webmention
            @else
            Webmentions
            @endif
        </summary>
        <div class="flex flex-col">
            <div class="counts full-width mt-3">
                @php
                $types=[ 'like-of'=> [
                'symbol' => '❤️',
                'name' => 'Likes'
                ],
                'repost-of' => [
                'symbol' => '🔁',
                'name' => 'Reposts'
                ],
                'bookmark-of' => [
                'symbol' => '🔖',
                'name' => 'Bookmarks'
                ],
                'mention-of' => [
                'symbol' => '🗣',
                'name' => 'Mentions'
                ]
                ];
                @endphp
                @foreach ($types as $i => $type)
                @if($webmentions['count'][$i] != 0)
                <span title="{{ $type['name'] }}">{{ $webmentions['count'][$i] }} {{ $type['symbol'] }}</span>
                @endif
                @endforeach
            </div>

            @if ($webmentions['count']['all'] == 0)
            <p>{{ $page->translate("page.no_comments") }}</p>
            @else
            @foreach ($webmentions['raw'] as $i => $comment)
            @if (!empty($comment['content']))
            <div class="comment p-4 pt-6">
                <div class="comment-author">
                    {{ $comment['author']['name'] }}
                </div>
                <div class="comment-content">
                    @if (isset($comment['content']['html']))
                    {{ $comment['content']['html'] }}
                    @elseif(isset($comment['content']['text']))
                    {{ $comment['content']['text'] }}
                    @endif
                    <a href="{{ $comment['url'] }}">Link</a>
                </div>
            </div>
            @endif
            @endforeach
            @endif
        </div>
    </details>
</div>
@endif

<nav class="flex justify-between text-sm md:text-base">
    <div>
        @if ($next = $page->getNext())
        <a href="{{ $next->getUrl() }}" title="Older Post: {{ $next->title }}">
            &LeftArrow; {{ $next->getShortTitle() }}
        </a>
        @endif
    </div>

    <div>
        @if ($previous = $page->getPrevious())
        <a href="{{ $previous->getUrl() }}" title="Newer Post: {{ $previous->title }}">
            {{ $previous->getShortTitle() }} &RightArrow;
        </a>
        @endif
    </div>
</nav>
@endsection
