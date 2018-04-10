'use strict';

var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var postcssImport = require('postcss-import');
// const debug = require('debug')('ember-casper-template:index');
// const resolve = require("resolve");

const StaticSiteJson = require('broccoli-static-site-json');
const MergeTrees = require('broccoli-merge-trees');
const walkSync = require('walk-sync');

const attributes = [
  'uuid',
  'title',
  'slug',
  'image',
  'imageMeta',
  'featured',
  'page',
  'status',
  'language',
  'meta_title',
  'meta_description',
  'date',
  'tags'
];

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

const authorTree = new StaticSiteJson(`author`, {
  contentFolder: 'author',
  attributes: ['name', 'image', 'cover', 'coverMeta', 'bio', 'website', 'location'],
  collections: [{
    src: 'author',
    output: 'author.json',
  }]
});

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

  // isDevelopingAddon() {
  //   return true;
  // },

  treeForPublic() {
    return MergeTrees([...jsonTrees, authorTree]);
  },

  urlsForPrember() {
    const staticUrls = ['/'];

    const contentUrls = walkSync('content', {
      globs: ['*.md'],
    }).map(file => file.replace(/\.md$/, ''));

    const authorUrls = walkSync('author', {
      globs: ['*.md'],
    }).map(file => file.replace(/\.md$/, '')).map(file => `/author/${file}`);

    return [...staticUrls, ...contentUrls, ...authorUrls];
  },

  included(app) {
    this._super.included.apply(this, arguments)

    app.import('node_modules/downsize-cjs/index.js', {
      using: [
        { transformation: 'cjs', as: 'downsize'}
      ]
    });

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
