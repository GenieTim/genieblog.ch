@php
    $path_info = pathinfo($src);
    $extension = $path_info['extension'];
    $without_extension = substr($src, 0, strrpos($src, "."));
@endphp

@if (in_array($extension, ['png', 'jpg', 'jpeg']))
<img alt="{{$alt}}" src="{{$page->baseUrl}}/assets/images/{{ $src }}" srcset="
  @php
      $sizes = [150, 300, 600, 900, 1200];
      foreach ($sizes as $i => $size) {
        echo $page->baseUrl . "/assets/build/images/$without_extension-$size.$extension $size w"; 
        if ($i < (count($sizes) - 1)) { echo ", "; } 
      } 
  @endphp " sizes="(max-width: 750px) 95vw, 30vw" class="{{ isset($classes) ? $classes : '' }}" />
@else
<img alt="{{$alt}}" src="{{$page->baseUrl}}/assets/images/{{ $src }}" class="{{ isset($classes) ? $classes : '' }}" />
@endif

