@extends('_layouts.master')

@section('body')
<script>
  function getUrl(lan) {
    return "{{$page->baseUrl}}/index." + lan;
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

<p>Wenn Sie nicht automatisch weitergeleitet werden, wählen Sie hier Ihre Sprache:</p>
<ul>
  <li><a href="{{$page->baseUrl}}/index.de">DE: Deutsch/German</a></li>
  <li><a href="{{$page->baseUrl}}/index.en">EN: English/Englisch</a></li>
</ul>

@stop
