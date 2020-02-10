@extends('_layouts.master')

@section('body')

<p>Wenn Sie nicht weitergeleitet werden, klicken Sie auf den folgenden Link:</p>
<ul>
  <li><a href="{{$page->baseUrl}}/index.de">DE</a></li>
  <li><a href="{{$page->baseUrl}}/index.en">EN</a></li>
</ul>

@stop
