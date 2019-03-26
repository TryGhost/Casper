/* eslint-env node */
const recast = require('recast');
const { readFileSync, writeFileSync } = require('fs');

module.exports = {
  description: 'The default blueprint for empress-blog-casper-template.',

  normalizeEntityName() {
    // no-op
  },

  afterInstall() {
    return this.addAddonsToProject({
      packages: [
        'ember-responsive-image',
      ]
    }).then(() => {
      const builders = recast.types.builders;

      let configFile = './config/environment.js'

      if(this.project.isEmberCLIAddon()) {
        configFile = './tests/dummy/config/environment.js';
      }

      const config = readFileSync(configFile);
      const configAst = recast.parse(config);

      recast.visit(configAst, {
        visitVariableDeclaration: function (path) {
          var node = path.node;

          const env = node.declarations.find(declaration => declaration.id.name === 'ENV');

          if (env) {
            let responsiveImage = env.init.properties.find(property => property.key.value === 'responsive-image');

            if(!responsiveImage) {
              responsiveImage = builders.property(
                'init',
                builders.literal('responsive-image'),
                builders.objectExpression([
                  builders.property('init', builders.identifier('sourceDir'), builders.literal('images')),
                  builders.property('init', builders.identifier('destinationDir'), builders.literal('responsive-images')),
                  builders.property('init', builders.identifier('quality'), builders.literal(80)),
                  builders.property('init', builders.identifier('supportedWidths'), builders.arrayPattern([
                    builders.literal(2000),
                    builders.literal(1000),
                    builders.literal(600),
                    builders.literal(300),
                  ])),
                  builders.property('init', builders.identifier('removeSourceDir'), builders.literal(false)),
                  builders.property('init', builders.identifier('justCopy'), builders.literal(false)),
                  builders.property('init', builders.identifier('extensions'), builders.arrayPattern([
                    builders.literal('jpg'),
                    builders.literal('jpeg'),
                    builders.literal('png'),
                    builders.literal('gif'),
                  ])),
                ])
              )

              env.init.properties.push(responsiveImage);
            }

            return false;
          }

          this.traverse(path);
        }
      });

      writeFileSync(configFile, recast.print(configAst, { tabWidth: 2, quote: 'single' }).code);
    });
  },
};
