'use strict';

const _ = require('lodash');
const autoprefixer = require('autoprefixer');
const colorFunction = require('postcss-color-function');
const cssnano = require('cssnano');
const customProperties = require('postcss-custom-properties');
const MergeTrees = require('broccoli-merge-trees');
const postcssImport = require('postcss-import');
const RSS = require('rss');
const StaticSiteJson = require('broccoli-static-site-json');
const walkSync = require('walk-sync');
const writeFile = require('broccoli-file-creator');
const yamlFront = require('yaml-front-matter');

const { readFileSync } = require('fs');
const { join } = require('path');

const attributes = [
  'uuid',
  'title',
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
  attributes: [
    'name',
    'image',
    'cover',
    'coverMeta',
    'bio',
    'website',
    'twitter',
    'facebook',
    'location',
  ],
  collections: [{
    src: 'author',
    output: 'author.json',
  }]
});

const content = walkSync('content', {
  globs: ['*.md'],
});

const contentYamls = _.chain(content)
  .map(path => ({
    path,
    yaml: yamlFront.loadFront(readFileSync(join('content', path)))
  }))
  .value();

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

    const trees = [...jsonTrees, authorTree];

    const config = this.project.config(process.env.EMBER_ENV || 'development');

    if (config.blog.host) {
      const rssConfig = {
          title: config.blog.title,
          generator: 'ember-casper-template',
          feed_url: `${config.blog.host}/rss.xml`,
          site_url: `${config.blog.host}/rss.xml`,
      }

      if (config.blog.icon) {
        rssConfig.image_url = `${config.blog.host}${config.blog.icon}`;
      }

      var feed = new RSS(rssConfig);

      contentYamls.forEach((item) => {
        feed.item({
            title: item.yaml.title,
            url: `http://example.com/${item.path.replace(/\.md$/, '')}`,
            author: item.yaml.author,
            date: item.yaml.date,
        });
      })

      trees.push(writeFile('rss.xml', feed.xml()));
    }

    return MergeTrees(trees);
  },

  contentFor(type, config) {
    if (type === 'head' && config.blog.host) {
      return `<link rel="alternate" type="application/rss+xml" title="${config.blog.title}" href="${config.blog.host}/rss.xml" />`
    }
  },

  urlsForPrember() {
    const staticUrls = ['/'];

    const tagUrls = contentYamls
      .map(file => file.tags)
      .flatten()
      .uniq()
      .map(tag => `/tag/${tag}`)
      .value();

    const contentUrls = content.map(file => file.replace(/\.md$/, ''));

    const authorUrls = walkSync('author', {
      globs: ['*.md'],
    }).map(file => file.replace(/\.md$/, '')).map(file => `/author/${file}`);

    return [...staticUrls, ...contentUrls, ...authorUrls, ...tagUrls];
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
