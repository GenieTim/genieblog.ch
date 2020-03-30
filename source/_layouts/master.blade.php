<!DOCTYPE html>
<html lang="{{ $page->language }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="{{ $page->meta_description ?? $page->siteDescription }}">

    <meta property="og:title" content="{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="{{ $page->getUrl() }}" />
    <meta property="og:description" content="{{ $page->siteDescription }}" />

    <base href="{{$page->baseUrl}}" />

    <title>{{ $page->title ?  $page->title . ' | ' : '' }}{{ $page->siteName }}</title>

    <link rel="home" href="{{ $page->baseUrl }}">
    <link rel="icon" href="/favicon.ico">
    <link href="{{$page->baseUrl}}/blog/feed.atom" type="application/atom+xml" rel="alternate"
        title="{{ $page->siteName }} Atom Feed">

    @stack('meta')

    @if ($page->production)
    <!-- Insert analytics code here -->
    @endif

    <link href="https://fonts.googleapis.com/css?family=Nunito+Sans:300,300i,400,400i,700,700i,800,800i"
        rel="stylesheet">
    <link rel="stylesheet" href="{{$page->baseUrl}}{{ mix('css/main.css', 'assets/build') }}">
</head>

<body
    class="flex flex-col justify-between min-h-screen bg-primary-complement text-primary-shade leading-normal font-sans">
    <header class="flex items-center shadow bg-primary-complement-shade border-b border-primary-shade h-24 py-4"
        role="banner">
        <div class="container flex items-center max-w-8xl mx-auto px-4 lg:px-8">
            <div class="flex items-center">
                <a href="{{$page->baseUrl}}/" title="{{ $page->siteName }} home" class="inline-flex items-center">
                    <img class="h-8 md:h-10 mr-3" src="{{ $page->baseUrl }}/assets/img/logo-light.svg"
                        alt="{{ $page->siteName }} logo" />

                    <h1 class="text-lg md:text-2xl text-primary font-semibold hover:text-primary-shade my-0">
                        {{ $page->siteName }}</h1>
                </a>
            </div>

            <div id="vue-search" class="flex flex-1 justify-end items-center">
                <search></search>
            </div>

            <button
                class="flex justify-center items-center bg-primary border border-primary h-10 w-10 p-3 rounded-full lg:hidden focus:outline-none"
                onclick="navMenu.toggle()" id="menu-toggle">
                <div></div>
                <div></div>
                <div></div>
            </button>

            @push('scripts')
            <script>
                const navMenu = {
                        toggle() {
                            const menu = document.getElementById('main-nav-menu');
                            menu.classList.toggle('hidden');
                            menu.classList.toggle('lg:block');
                            const btn = document.getElementById('menu-toggle');
                            btn.classList.toggle('clicked');
                        },
                    }
            </script>
            @endpush

            <nav class="hidden lg:flex items-center justify-end text-lg nav-menu" id="main-nav-menu">

                <a title="{{ $page->siteName }} Blog"
                    href="{{$page->baseUrl}}/blog/{{$page->language}}/index.{{$page->language}}"
                    class="nav-menu__item ml-6 text-primary-shade hover:text-secondary {{ $page->isActive('/blog/index_' . $page->language) ? 'active text-primary' : '' }}">
                    Blog
                </a>

                <a title="{{ $page->siteName }} {{ $page->translate('menu.about') }}"
                    href="{{$page->baseUrl}}/pages/{{$page->language}}/about"
                    class="nav-menu__item ml-6 text-primary-shade hover:text-secondary {{ $page->isActive('/about') ? 'active text-primary' : '' }}">
                    {{ $page->translate('menu.about') }}
                </a>
            </nav>
        </div>
    </header>


    <main role="main" class="flex-auto w-full container max-w-4xl mx-auto py-16 px-6">
        @yield('body')
    </main>

    <footer class="text-center shadow bg-primary-complement border-t text-sm mt-12 py-4" role="contentinfo">
        <ul class="flex flex-col md:flex-row justify-center list-none">
            <li class="md:mr-2">
                <a href="" title="Read the imprint/impressum">{{ $page->translate('master.copyright.imprint') }}</a>.
            </li>

            <li class="md:mr-2">
                {{ $page->translate('master.language.choose') }}
                @foreach ($page->languages as $lang)
                @if ($page->hasTranslation($lang))
                <a href="{{ $page->translateUrl($lang) }}" title="Read this in {{$lang}}">
                    {{$lang}}
                </a>@if (!$loop->last), @endif
                @endif
                @endforeach
                .
            </li>

            <li>
                {{ $page->translate('master.checkout.github') }} <a href="https://github.com/GenieTim/genieblog.ch"
                    title="Source of genieblog.ch">GitHub</a>.
            </li>
        </ul>
        <ul class="flex flex-col md:flex-row justify-center list-none">
            <li class="md:mr-2">
                &copy; Tim Bernhard. {{ $page->translate('master.copyright.rights') }}
            </li>

            <li>
                {{ $page->translate('master.built.with') }} ❤️, <a href="http://jigsaw.tighten.co"
                    title="Jigsaw by Tighten">Jigsaw</a>
                {{ $page->translate('master.and') }} <a href="https://tailwindcss.com"
                    title="Tailwind CSS, a utility-first CSS framework">Tailwind
                    CSS</a>.
            </li>
        </ul>
    </footer>

    <script src="{{$page->baseUrl}}{{ mix('js/main.js', 'assets/build') }}"></script>

    @stack('scripts')
</body>

</html>
