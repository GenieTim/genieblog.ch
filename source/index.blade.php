@extends('_layouts.master')

@push('scripts')
<script>
  function getUrl(lan) {
    return "{{$page->baseUrl}}/index_" + lan;
  }

  var language = window.navigator.userLanguage || window.navigator.language;
    var languages = [
      @foreach ($page->languages as $lang)
        "{{$lang}}",
      @endforeach
    ];
    languages.forEach(lanTest => {
      if (language.includes(lanTest)) {
        window.location.replace(getUrl(lanTest));
      }
    });
    // language is not a supported one – use the default:
    window.location.replace(getUrl("{{$page->language}}"));
</script>
@endpush

@section('body')

<p>Wenn Sie nicht weitergeleitet werden, klicken Sie auf den folgenden Link:</p>
<ul>
  <li><a href="{{$page->baseUrl}}/index.de">DE</a></li>
  <li><a href="{{$page->baseUrl}}/index.en">EN</a></li>
</ul>

@stop
