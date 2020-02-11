<nav class="hidden lg:flex items-center justify-end text-lg">

    @foreach ($pages_de as $p)
    <a title="{{ $page->siteName }} Blog" href="{{$p->getUrl()}}"
        class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive($p->getUrl()) ? 'active text-blue-600' : '' }}">
        {{$p->title}}
    </a>
    @endforeach
    <a title="{{ $page->siteName }} Blog" href="{{$page->baseUrl}}/blog"
        class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive('/blog') ? 'active text-blue-600' : '' }}">
        Blog
    </a>

    <a title="{{ $page->siteName }} About" href="{{$page->baseUrl}}/about"
        class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive('/about') ? 'active text-blue-600' : '' }}">
        About
    </a>

    <a title="{{ $page->siteName }} Contact" href="{{$page->baseUrl}}/contact"
        class="ml-6 text-gray-700 hover:text-blue-600 {{ $page->isActive('/contact') ? 'active text-blue-600' : '' }}">
        Contact
    </a>
</nav>
