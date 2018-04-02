/* eslint-env node */

module.exports = {
  description: 'The default blueprint for ember-casper-template.',

  normalizeEntityName() {
    // no-op
  },

  afterInstall() {
    return this.addAddonsToProject({
      packages: [
        'prember',
        'ember-cli-cjs-transform',
        'ember-cli-fastboot',
      ]
    });
  },

  filesToRemove: ['app/templates/application.hbs'],
};
