import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend({
  buildURL(modelName, id, snapshot, requestType, query) {
    if (requestType === 'queryRecord') {
      return `/${modelName}/${query.path}.json`;
    } else if (requestType === 'query') {
      return `/${modelName}/${query.path}.json`;
    } else if (requestType === 'findRecord') {
      return `/${modelName}/${id}.json`;
    }

    return this._super(...arguments);
  },
});
