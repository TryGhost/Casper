import Route from '@ember/routing/route';
import { hash } from 'rsvp';

export default Route.extend({
  classNames: ["post-template"],
  model(params) {
    return hash({
      post:  this.store.queryRecord('content', {
        path: params.id,
      }),
      posts: this.store.query('content', {
        path: 'content',
      })
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
