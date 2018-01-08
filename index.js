'use strict';

const debug = require('debug')('ember-casper-template:index');
const OutputStylesPreprocessor = require('./lib/output-styles-preprocessor');


const Funnel = require('broccoli-funnel')
const Merge = require('broccoli-merge-trees')

  var autoprefixer = require('autoprefixer');
  var colorFunction = require('postcss-color-function');
  var cssnano = require('cssnano');
  var customProperties = require('postcss-custom-properties');
  var postcssImport = require('postcss-import');
  var resolve = require('resolve');

  var plugins = [
    postcssImport,
    customProperties,
    colorFunction,
    autoprefixer,
    cssnano,
  ];

module.exports = {
  name: 'ember-casper-template',

  // init() {
  //   this._super.init && this._super.init.apply(this, arguments);
  //   this.outputStylesPreprocessor = new OutputStylesPreprocessor({ owner: this });
  // },
  //
  // getPostcssPlugins() {
  //   var autoprefixer = require('autoprefixer');
  //     var colorFunction = require('postcss-color-function');
  //     var cssnano = require('cssnano');
  //     var customProperties = require('postcss-custom-properties');
  //     var postcssImport = require('postcss-import');
  //
  //     return [
  //       postcssImport,
  //       customProperties,
  //       colorFunction,
  //       autoprefixer,
  //       cssnano,
  //     ];
  // },

  //
  // // treeForAddon() {
  // //   let addonTree = this._super.treeForAddon.apply(this, arguments);
  // //
  // //   return new MergeTrees([addonTree, `${__dirname}/vendor`]);
  // // },
  //
  // setupPreprocessorRegistry(type, registry) {
  //   // Skip if we aren't setting up this addon's own registry
  //   if (type !== 'self') { return; }
  //
  //   debug('setting up registry', type);
  //
  //   registry.add('css', this.outputStylesPreprocessor);
  //
  //   if (type === 'parent') {
  //     this.parentRegistry = registry;
  //   }
  // },
  //
  // belongsToAddon() {
  //   return !!this.parent.parent;
  // },

  // treeForVendor: function (node) {
  //   var path = require('path');
  //   var Funnel = require('broccoli-funnel');
  //   var mergeTrees = require('broccoli-merge-trees');
  //   var compileCSS = require('broccoli-postcss');
  //
  //   var autoprefixer = require('autoprefixer');
  //   var colorFunction = require('postcss-color-function');
  //   var cssnano = require('cssnano');
  //   var customProperties = require('postcss-custom-properties');
  //   var postcssImport = require('postcss-import');
  //   var resolve = require('resolve');
  //
  //   var plugins = [
  //     postcssImport,
  //     customProperties,
  //     // colorFunction,
  //     // autoprefixer,
  //     // cssnano,
  //   ];
  //
  //   var css = compileCSS('addon/styles', {
  //     plugins,
  //     browsers: ['last 3 version'],
  //     include: ['addon/styles/*.css'],
  //   });
  //
  //   node = (node) ? mergeTrees([ node, css ]) : css;
  //
  //   return node;
  // },
  //
  //
  // postcssOptions: {
  //   compile: {
  //     enable: false,
  //     plugins: [
  //       { module: postcssImport },
  //       { module: customProperties },
  //       { module: colorFunction },
  //       { module: autoprefixer },
  //       { module: cssnano },
  //     ]
  //   }
  // },

  included(app) {
    this._super.included.apply(this, arguments)

    debug('options before', app.options.postcssOptions);

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

    debug('options after', require('util').inspect(app.options.postcssOptions, { depth: 3 }));
  },
};
