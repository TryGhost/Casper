import Route from '@ember/routing/route';

export default Route.extend({
  classNames: ["author-template"],
  model(params) {
    // load content first for ember-data autopopulation
    return this.store.query('content', {
      path: 'content',
    }).then(() => {
      return this.store.findRecord('author', params.id)
    });
  },

  actions: {
    didTransition() {
      this._super();
      window.scrollTo(0,0);
    }
  }
});
