<?php

namespace App\Listeners;

use Highlight\Highlighter;
use TightenCo\Jigsaw\Jigsaw;

class HighlightCodeSyntax
{
  private $highlighter;

  public function __construct()
  {
    $this->highlighter = new Highlighter();
    $this->highlighter->setAutodetectLanguages([
      'html',
      'php',
      'css',
      'js',
      'shell'
    ]);
  }

  public function handle(Jigsaw $jigsaw)
  {
    $collections = $jigsaw->getCollections();
    foreach ($collections as $collecationName => $collection) {
      foreach ($collection as $key => $page) {
        $file = ltrim($page->getPath() . '/index.html', '/');
        $content = $jigsaw->readOutputFile($file);
        $formattedContent = $this->applySyntaxHighlighting($content);
        $jigsaw->writeOutputFile($file, $formattedContent);
      }
    }
  }

  /**
   * Apply Syntax Highlighting on a string
   * Adabted from https://stefanzweifel.io/posts/server-side-syntax-highlighting-with-jigsaw/ 
   * Adapted from https://github.com/S1SYPHOS/kirby-highlight/blob/master/core/syntax_highlight.php
   * @param  string $value
   * @return string
   */
  private function applySyntaxHighlighting(string $value): string
  {
    // TODO: patternmatch for added classes
    // match classless code
    $pattern = "/<pre><code(?: class=[\"']language-([A-Za-z]*)[\"'])[^>]*>(.*)(?=<\/code><\/pre>)/Uis";

    $highlighter = $this->highlighter;
    return preg_replace_callback($pattern, function ($match) use ($highlighter) {
      // $match has the following structure:
      // 0: full match; 1: programming language (group 1, if matched); 2: the code
      //
      $input = htmlspecialchars_decode($match[2]);

      if (!empty(trim($match[1]))) {
        return $highlighter->highlight($match[1], $input)->value;
      } else {
        return $highlighter->highlightAuto($input)->value;
      }
    }, $value);
  }
}
