<nav class="hidden lg:flex items-center justify-end text-lg">

    {{-- @foreach ($pages_de as $p)
    <a title="{{ $page->siteName }} {{$p->title}}" href="{{$p->getUrl()}}"
    class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive($p->getUrl()) ? 'active text-blue-600' : '' }}">
    {{$p->title}}
    </a>
    @endforeach --}}

    <a title="{{ $page->siteName }} Blog" href="{{$page->baseUrl}}/blog/index_{{$page->language}}"
        class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive('/blog/index_' . $page->language) ? 'active text-blue-600' : '' }}">
        Blog
    </a>

    <a title="{{ $page->siteName }} About" href="{{$page->baseUrl}}/pages/{{$page->language}}/about"
        class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive('/about') ? 'active text-blue-600' : '' }}">
        About
    </a>
</nav>
