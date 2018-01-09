import Route from '@ember/routing/route';

export default Route.extend({
  classNames: ["index-template"],
  model() {
    return this.store.query('content', {
      path: 'content',
    });
  },

  actions: {
    didTransition() {
      this._super();
      window.scrollTo(0,0);
    }
  }
});
