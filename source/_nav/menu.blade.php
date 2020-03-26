<nav class="hidden lg:flex items-center justify-end text-lg">

    {{-- @foreach ($pages_de as $p)
    <a title="{{ $page->siteName }} {{$p->title}}" href="{{$p->getUrl()}}"
    class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive($p->getUrl()) ? 'active text-blue-600' : '' }}">
    {{$p->title}}
    </a>
    @endforeach --}}

    <a title="{{ $page->siteName }} Blog" href="{{$page->baseUrl}}/blog/{{$page->language}}/index.{{$page->language}}"
        class="ml-6 text-white hover:text-teal {{ $page->isActive('/blog/index_' . $page->language) ? 'active text-teal-400' : '' }}">
        Blog
    </a>

    <a title="{{ $page->siteName }} {{ $page->translate('menu.about') }}"
        href="{{$page->baseUrl}}/pages/{{$page->language}}/about"
        class="ml-6 text-white hover:text-teal {{ $page->isActive('/about') ? 'active text-teal-400' : '' }}">
        {{ $page->translate('menu.about') }}
    </a>
</nav>
