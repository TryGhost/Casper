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
      if(window && window.scrollTo) {
        window.scrollTo(0,0);
      }
    }
  }
});
