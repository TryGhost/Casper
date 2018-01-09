import Route from '@ember/routing/route';

export default Route.extend({
  classNames: ["page-template"],
  model(params) {
    return this.store.queryRecord('page', {
      path: params.id,
    })
  },

  actions: {
    didTransition() {
      this._super();
      window.scrollTo(0,0);
    }
  }
});
