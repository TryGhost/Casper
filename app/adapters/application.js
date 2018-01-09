import DS from 'ember-data';

import config from '../config/environment';

export default DS.JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    let prefix = config.apiHost || '';

    if (prefix && config.apiNamespace) {
      prefix += `/${config.apiNamespace}`;
    } else if(prefix) {
      prefix += config.apiNamespace;
    }

    if (requestType === 'queryRecord') {
      return `${prefix}/${modelName}/${query.path}.json`;
    } else if (requestType === 'query') {
      return `${prefix}/${modelName}/${query.path}.json`;
    } else if (requestType === 'findRecord') {
      return `${prefix}/${modelName}/${id}.json`;
    }

    return this._super(...arguments);
  },
});
