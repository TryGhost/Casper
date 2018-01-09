import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';

export default Route.extend({
  classNames: ["index-template"],
  store: service(),
  model() {
    return get(this, 'store').query('content', {
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
