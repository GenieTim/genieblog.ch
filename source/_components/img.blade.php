<img alt="{{$alt}}" src="{{$page->baseUrl}}/assets/images/{{ $src }}.jpg" srcset="
@php
    $sizes = [150, 300, 600, 900, 1200];
    foreach ($sizes as $i => $size) {
      echo $page->baseUrl . "/assets/build/source/assets/images/" . $src . "-" .$size . ".jpg " . $size . "w"; 
      if ($i < (count($sizes) - 1)) { echo ", "; } 
    } 
@endphp " sizes="(max-width: 750px) 95vw, 30vw" />
