<?php

return [
  'spaceless' => function () {
    return '<?php ob_start() ?>';
  },
  'endspaceless' => function () {
    return "<?php echo preg_replace('/>\\s+</', '><', ob_get_clean()); ?>";
  }
];
