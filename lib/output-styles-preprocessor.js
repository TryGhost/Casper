'use strict';

const debug = require('debug')('ember-ghost-casper-template:output-styles-preprocessor');
const PostCSS = require('broccoli-postcss');

module.exports = class OutputStylesPreprocessor {
  constructor(options) {
    this.owner = options.owner;
  }

  toTree(inputNode, inputPath, outputDirectory, options) {
    debug('my output paths', options.outputPaths)
    let outputFile = options.outputPaths[this.owner.belongsToAddon() ? 'addon' : 'app'];
    let concatOptions = {
      inputFiles: ['**/*.css'],
      outputFile: outputFile,
      allowNone: true,
      sourceMapConfig: {
        extensions: ['css'],
        mapCommentType: 'block'
      }
    };

    debug('concatenating module stylesheets: %o', concatOptions);

    // let modulesTree = this.owner.getModulesTree();
    let concat;

    let plugins = this.owner.getPostcssPlugins();

    if (plugins && plugins.length) {
      debug('running postprocess plugins: %o', plugins);

      concat = new PostCSS(`${this.owner.belongsToAddon() ? 'addon' : 'app'}/styles`, {
        plugins,
      });
    }

    return concat;
  }
};
