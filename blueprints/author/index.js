/* eslint-env node */

const Case = require('case');

module.exports = {
  description: 'Generates a new author',

  locals(options) {
    return {
      name: Case.capital(options.entity.name),
      id: Case.kebab(options.entity.name),
    };
  }
};
