import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { get } from '@ember/object';
import BlogMetaMixin from 'ember-meta/mixins/blog-meta';

export default Route.extend(BlogMetaMixin, {
  classNames: ["index-template"],
  store: service(),
  model() {
    return this.store.query('content', {
      path: 'content',
    });
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
