'use strict';

var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var postcssImport = require('postcss-import');
const debug = require('debug')('ember-casper-template:index');

// const StaticSiteJson = require('broccoli-static-site-json');
// const MergeTrees = require('broccoli-merge-trees');
// const Funnel = require('broccoli-funnel');
//
// const attributes = ['uuid', 'title', 'slug', 'image', 'featured', 'page', 'status', 'language', 'meta_title', 'meta_description', 'date', 'tags'];
// const references = ['author']

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

  // treeForAddon() {
  //   let tree = this._super.treeForApp.apply(this, arguments);
  //
  //   debug('what about this', tree.inputPaths)
  //
  //   const jsonTrees = ['content', 'page'].map((contentFolder) => {
  //     return new StaticSiteJson(contentFolder, {
  //       attributes,
  //       references,
  //       contentFolder,
  //       collections: [{
  //         src: contentFolder,
  //         output: `${contentFolder}.json`,
  //       }],
  //     });
  //   });
  //
  //   const authorTree = new StaticSiteJson(`author`, {
  //     contentFolder: 'author',
  //     attributes: ['name', 'image', 'cover', 'bio', 'website', 'location'],
  //     collections: [{
  //       src: 'author',
  //       output: 'author.json',
  //     }]
  //   });
  //
  //   return new MergeTrees([tree, ...jsonTrees, authorTree]);
  // },


  included(app) {
    this._super.included.apply(this, arguments)

    app.import('node_modules/downsize/index.js');

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
