<div class="flex flex-col mb-4">
    <article class="h-entry">
        <p class="text-gray-400 font-medium my-2">
            <time datetime="{{ date('c', $page->date) }}" title="Created"
                class="dt-published">{{ $post->getDate()->format('F j, Y') }}</time>
        </p>

        <h2 class="text-3xl mt-0">
            <a href="{{ $post->getUrl() }}" title="Read more - {{ $post->title }}"
                class="text-primary-shade font-extrabold u-url">{{ $post->title }}</a>
        </h2>

        <p class="mb-4 mt-0 p-summary">{!! $post->getExcerpt(200) !!}</p>

        <a href="{{ $post->getUrl() }}" title="Read more - {{ $post->title }}"
            class="uppercase font-semibold tracking-wide mb-2">{{ $page->translate('page.read') }}</a>
    </article>
</div>
