<?php

namespace App\Listeners;

use TightenCo\Jigsaw\Jigsaw;

class SetinMathjax
{
  public function handle(Jigsaw $jigsaw)
  {
    $pages = $jigsaw->getOutputPaths();
    foreach ($pages as $path) {
      $file = $jigsaw->getDestinationPath() . $path;
      if (is_dir($file)) {
        $file = $file . '/index.html';
      }

      $ext = pathinfo($file, PATHINFO_EXTENSION);
      if ($ext !== 'html') {
        continue;
      }

      $file_content = file_get_contents($file);

      if (strpos($file_content, '<math>') !== false || strpos($file_content, '<inline-math>') !== false) {
        // either we could parse & handle stuff here...
        // but since no nice library for PHP is available, 
        // it seems to be less of a hack to just using mathjax where necessary.
        $src = '<script type="text/javascript" id="MathJax-script" defer src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"></script>';
        $replacement = $src . '</head>';
        $new_file_content = str_replace('</head>', $replacement, $file_content);
        $new_file_content = str_replace('<inline-math>', '\(', $new_file_content);
        $new_file_content = str_replace('</inline-math>', '\)', $new_file_content);
        $new_file_content = str_replace('<math>', '\[', $new_file_content);
        $new_file_content = str_replace('</math>', '\]', $new_file_content);
        file_put_contents($file, $new_file_content);
      }
    }
  }
}
