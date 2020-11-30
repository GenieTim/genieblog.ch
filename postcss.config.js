'use strict';

module.exports = {
  postcssOptions: {
    plugins: [
      require('tailwindcss'),
      require('postcss-css-variables')({
        preserve: true
      })
    ],
  }
};
