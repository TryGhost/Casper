'use strict';

var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var postcssImport = require('postcss-import');

module.exports = {
  name: 'ember-casper-template',

  options: {
    postcssOptions: {
      compile: {
        enable: true,
        plugins: [
          { module: postcssImport },
          { module: customProperties },
          { module: colorFunction },
          { module: autoprefixer },
          { module: cssnano },
        ]
      }
    }
  },

  included(app) {
    this._super.included.apply(this, arguments)

    app.options.postcssOptions = Object.assign({
        compile: {
          enable: true,
          plugins: [
            { module: postcssImport },
            { module: customProperties },
            { module: colorFunction },
            { module: autoprefixer },
            { module: cssnano },
          ]
        }
      },
      app.options.postcssOptions
    );
  },
};
