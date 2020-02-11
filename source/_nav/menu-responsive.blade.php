<nav id="js-nav-menu" class="nav-menu hidden lg:hidden">
    <ul class="my-0">
        <li class="pl-4">
            <a title="{{ $page->siteName }} Blog" href="{{$page->baseUrl}}/blog/index_{{$page->language}}"
                class="nav-menu__item hover:text-blue-500 {{ $page->isActive('/blog/index_' . $page->language) ? 'active text-blue' : '' }}">Blog</a>
        </li>
        <li class="pl-4">
            <a title="{{ $page->siteName }} About" href="{{$page->baseUrl}}/pages/{{$page->language}}/about"
                class="nav-menu__item hover:text-blue-500 {{ $page->isActive('/about') ? 'active text-blue' : '' }}">About</a>
        </li>
    </ul>
</nav>
