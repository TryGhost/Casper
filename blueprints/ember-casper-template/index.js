/* eslint-env node */

module.exports = {
  description: 'The default blueprint for ember-casper-template.',

  normalizeEntityName() {
    // no-op
  },

  afterInstall() {
    return this.addAddonsToProject({
      packages: [
        'prember@0.3.0',
        'ember-cli-cjs-transform',
        'ember-cli-fastboot',
        'ember-moment',
      ]
    });
  },

  filesToRemove: ['app/templates/application.hbs'],
};
