'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var postcssImport = require('postcss-import');

const StaticSiteJson = require('broccoli-static-site-json');
const BroccoliMergeTrees = require('broccoli-merge-trees');

const attributes = ['uuid', 'title', 'slug', 'image', 'featured', 'page', 'status', 'language', 'meta_title', 'meta_description', 'date', 'tags'];
const references = ['author']

const jsonTrees = ['content', 'page'].map((contentFolder) => {
  return new StaticSiteJson(contentFolder, {
    attributes,
    references,
    contentFolder,
    collections: [{
      src: contentFolder,
      output: `${contentFolder}.json`,
    }],
  });
});

const authorTree = new StaticSiteJson('author', {
  contentFolder: 'author',
  attributes: ['name', 'image', 'cover', 'bio', 'website', 'location'],
  collections: [{
    src: 'author',
    output: 'author.json',
  }]
});

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    postcssOptions: {
      compile: {
        plugins: [
          { module: postcssImport },
          { module: customProperties },
          { module: colorFunction },
          { module: autoprefixer },
          { module: cssnano },
        ]
      }
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  app.import('node_modules/downsize/index.js');

  return new BroccoliMergeTrees([app.toTree(), ...jsonTrees, authorTree]);
};
