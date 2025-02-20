'use strict';

module.exports = {
  postcssOptions: {
    plugins: [
      require('@tailwindcss/postcss'),
      require('postcss-css-variables')({
        preserve: true
      })
    ],
  }
};
