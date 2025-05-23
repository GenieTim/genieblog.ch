<!DOCTYPE html>
@spaceless
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

    {{--
    <base href="{{$page->baseUrl}}" /> --}}

    <title>{{ $page->title ? $page->title . ' | ' : '' }}{{ $page->siteName }}</title>

    <link rel="home" href="{{ $page->baseUrl }}">

    <!-- defered scripts: first in HTML to start loading, last to be actually loaded -->
    <script src="{{$page->baseUrl}}{{ mix('js/main.js', 'assets/build') }}" defer></script>

    <!-- favicons generated with realfavicongenerator.net -->
    <link rel="apple-touch-icon" sizes="180x180" href="{{$page->baseUrl}}/assets/images/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/svg+xml" sizes="any" href="{{$page->baseUrl}}/assets/images/favicon/favicon.svg" />
    <link rel="icon" type="image/png" sizes="32x32" href="{{$page->baseUrl}}/assets/images/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="{{$page->baseUrl}}/assets/images/favicon/favicon-16x16.png">
    <link rel="manifest" href="{{$page->baseUrl}}/assets/images/favicon/site.webmanifest">
    <link rel="mask-icon" href="{{$page->baseUrl}}/assets/images/favicon/safari-pinned-tab.svg" color="#dd6b20">
    <link rel="shortcut icon" href="{{$page->baseUrl}}/assets/images/favicon/favicon.ico">
    <meta name="apple-mobile-web-app-title" content="Genieblog">
    <meta name="application-name" content="Genieblog">
    <meta name="msapplication-TileColor" content="#da532c">
    <meta name="msapplication-config" content="{{$page->baseUrl}}/assets/images/favicon/browserconfig.xml">
    <meta name="theme-color" content="#140a02">

    <!-- social -->
    <link href="https://facebook.com/tim.genie.bernhard" rel="me">
    <link href="https://github.com/genietim" rel="me">
    <link href="https://twitter.com/genie_tim" rel="me">
    <link rel="webmention" href="https://webmention.io/genieblog.ch/webmention" />
    <link rel="pingback" href="https://webmention.io/genieblog.ch/xmlrpc" />
    <link href="{{ $page->baseUrl }}/blog/{{ $page->language }}/feed.{{ $page->language }}.atom"
        type="application/atom+xml" rel="alternate" title="{{ $page->siteName }} Atom Feed">

    <!-- some SEO improvement -->
    @if ($page->requiresCanonical)
    <link rel="canonical" href="https://www.genieblog.ch/{{ $page->getPath() }}" />
    @endif

    @stack('meta')

    @if ($page->production)
    <!-- Global site tag (gtag.js) - Google Analytics -->
    <!-- <script async src="https://www.googletagmanager.com/gtag/js?id=UA-55658858-3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-55658858-3');
    </script> -->
    @endif

    <link rel="stylesheet" href="{{$page->baseUrl}}{{ mix('css/main.css', 'assets/build') }}">
</head>

<body
    class="flex flex-col justify-between min-h-screen bg-primary-complement text-primary-shade leading-normal font-sans">
    <a class="sr-only rounded-br focus:bg-indigo-800 text-white" href="#skip-content-target" aria-hidden="true">
        Skip to content ↓
    </a>
    <header class="flex items-center shadow bg-primary-complement-shade border-b border-primary-shade h-24 py-4"
        role="banner">
        <div class="container flex items-center max-w-8xl mx-auto px-4 lg:px-8">
            <div class="flex items-center">
                <a href="{{$page->baseUrl}}/index.{{$page->language}}" title="{{ $page->siteName }} home"
                    class="inline-flex items-center">
                    <img class="h-8 md:h-10 mr-3 darkmode-only" src="{{ $page->baseUrl }}/assets/img/logo-light.svg"
                        alt="{{ $page->siteName }} logo" />

                    <img class="h-8 md:h-10 mr-3 lightmode-only" src="{{ $page->baseUrl }}/assets/img/logo-dark.svg"
                        alt="{{ $page->siteName }} logo" />

                    <h1 class="text-lg md:text-2xl text-primary-shade hover:text-primary font-semibold my-0 mt-0">
                        {{ $page->siteName }}</h1>
                </a>
            </div>

            <div id="vue-search" class="flex flex-1 justify-end items-center">
                @include('_components.search')
            </div>

            <button
                class="flex justify-center items-center bg-primary border border-primary h-10 w-10 p-3 rounded-full lg:hidden focus:outline-none"
                onclick="navMenu.toggle()" id="menu-toggle" aria-label="Toggle Mobile Menu">
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

    <div id="skip-content-target" class="hidden" tabindex="-1"></div>

    @yield('hero')

    <main role="main" class="flex-auto w-full container max-w-4xl mx-auto py-6 px-6">
        @yield('body')
    </main>

    <!-- hidden h-card: http://microformats.org/wiki/h-card -->
    <div class="container hidden">
        <hr class="border-b my-6" />

        <div class="w-full my-6">
            <div class="h-card flex">
                @include('_components.img', ['alt' => "Photo von Tim", 'src' => "portrait-tim.jpg", 'classes' =>
                'u-photo
                rounded-full max-w-xs' ])
                <div class="flex-1">
                    <address class="text-normal p-5">
                        <a class="u-url p-name" href="https://www.genieblog.ch"><span class="p-first-name">Tim</span>
                            <span class="p-family-name">Bernhard</span></a><br />
                        <time class="pdt-bday hidden">1996-08-02</time>
                        <a class="p-org h-card" href="https://www.bernhard-webstudio.ch">Bernhard Webstudio</a><br />
                        <a class="u-email" href="mailto:tim@genieblog.ch">tim@genieblog.ch</a><br />
                        <a class="p-tel" href="tel:+41763655579">+41 76 365 55 79</a><br />
                        <span class="p-locality">Zürich</span><br />
                        <span class="p-country-name">Switzerland</span><br />
                    </address>
                    <div class="social-icons content-center justify-center text-center w-full">
                        <a href="https://www.facebook.com/tim.genie.bernhard" title="Tim Bernhards Facebook">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>Facebook icon</title>
                                <path
                                    d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com/genie_tim">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>Twitter icon</title>
                                <path
                                    d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/timgeniebernhard/">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>LinkedIn icon</title>
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href="https://github.com/genietim/">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>GitHub icon</title>
                                <path
                                    d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                            </svg>
                        </a>
                        <a href="{{ $page->baseUrl }}/blog/{{ $page->language }}/feed.{{ $page->language }}.atom">
                            <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <title>RSS icon</title>
                                <path
                                    d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <footer class="shadow bg-primary-complement border-t mt-12 py-4 text-base" role="contentinfo">
        <div class="container p-1 flex flex-wrap flex-col sm:flex-row width-100">
            <ul class="flex flex-col md:flex-row justify-center list-none md:justify-start md:w-auto mt-2 mb-2">
                <li class="md:mr-2">
                    <a href="{{$page->baseUrl}}/pages/{{$page->language}}/imprint" title="Read the imprint/impressum">{{
                        $page->translate('master.copyright.imprint') }}</a>.
                </li>

                <li class="md:mr-2 lang-selection">
                    {{ $page->translate('master.language.choose') }}
                    @foreach ($page->languages as $lang)
                    @if ($page->hasTranslation($lang))
                    <a href="{{ $page->translateUrl($lang) }}" title="Read this in {{$lang}}" class="lang-link"
                        data-no-instant>{{$lang}}</a>{{ $loop->last ? "." : ", " }}
                    @endif
                    @endforeach
                </li>

                <li>
                    {{ $page->translate('master.checkout.github') }} <a href="https://github.com/GenieTim/genieblog.ch"
                        title="Source of genieblog.ch">GitHub</a>.
                </li>
            </ul>
        </div>
        <div class="container p-1 flex flex-wrap flex-col sm:flex-row width-100">
            <ul class="flex flex-col md:flex-row justify-center list-none md:justify-start md:w-auto mt-2 mb-2">
                <li class="md:mr-2">
                    &copy; <a href="{{ $page->baseUrl }}/pages/{{ $page->language }}/about#Tim+Bernhard">Tim
                        Bernhard</a>.
                    {{ $page->translate('master.copyright.rights') }}
                </li>

                <li>
                    {{ $page->translate('master.built.with') }} ❤️, <a href="http://jigsaw.tighten.co"
                        title="Jigsaw by Tighten">Jigsaw</a>
                    {{ $page->translate('master.and') }} <a href="https://tailwindcss.com"
                        title="Tailwind CSS, a utility-first CSS framework">Tailwind
                        CSS</a>.
                </li>
            </ul>
            <span class="inline-flex lg:ml-auto lg:mt-0 mt-6 w-full justify-center md:justify-start md:w-auto">
                <a href="https://www.facebook.com/tim.genie.bernhard" title="Tim Bernhards Facebook" class="m-2">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                        fill="currentColor">
                        <title>Facebook icon</title>
                        <path
                            d="M23.9981 11.9991C23.9981 5.37216 18.626 0 11.9991 0C5.37216 0 0 5.37216 0 11.9991C0 17.9882 4.38789 22.9522 10.1242 23.8524V15.4676H7.07758V11.9991H10.1242V9.35553C10.1242 6.34826 11.9156 4.68714 14.6564 4.68714C15.9692 4.68714 17.3424 4.92149 17.3424 4.92149V7.87439H15.8294C14.3388 7.87439 13.8739 8.79933 13.8739 9.74824V11.9991H17.2018L16.6698 15.4676H13.8739V23.8524C19.6103 22.9522 23.9981 17.9882 23.9981 11.9991Z" />
                    </svg>
                </a>
                <a href="https://twitter.com/genie_tim" class="m-2" title="Tim Bernhards Twitter">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                        fill="currentColor">
                        <title>Twitter icon</title>
                        <path
                            d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
                    </svg>
                </a>
                <a href="https://www.linkedin.com/in/timgeniebernhard/" class="m-2" title="Tim Bernhards LinkedIn">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                        fill="currentColor">
                        <title>LinkedIn icon</title>
                        <path
                            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                </a>
                <a href="https://github.com/genietim/" class="m-2" title="Tim Bernhards GitHub">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                        fill="currentColor">
                        <title>GitHub icon</title>
                        <path
                            d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                </a>
                <a href="{{ $page->baseUrl }}/blog/{{ $page->language }}/feed.{{ $page->language }}.atom" class="m-2"
                    title="This sites RSS/atom feed">
                    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="w-5 h-5"
                        fill="currentColor">
                        <title>RSS icon</title>
                        <path
                            d="M19.199 24C19.199 13.467 10.533 4.8 0 4.8V0c13.165 0 24 10.835 24 24h-4.801zM3.291 17.415c1.814 0 3.293 1.479 3.293 3.295 0 1.813-1.485 3.29-3.301 3.29C1.47 24 0 22.526 0 20.71s1.475-3.294 3.291-3.295zM15.909 24h-4.665c0-6.169-5.075-11.245-11.244-11.245V8.09c8.727 0 15.909 7.184 15.909 15.91z" />
                    </svg>
                </a>
            </span>
        </div>
    </footer>

    @stack('scripts')
</body>

</html>
@endspaceless
