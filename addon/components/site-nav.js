import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { computed, get } from '@ember/object';
import layout from '../templates/components/site-nav';

export default Component.extend({
  blog: service(),
  router: service(),
  isHome: computed('router.currentRouteName', function() {
    return this.router.currentRouteName === 'index';
  }),
  rssFeed: computed('blog.host', function() {
    return `https://feedly.com/i/subscription/feed${encodeURIComponent('/' + get(this, 'blog.host') + '/rss.xml')}`;
  }),
  layout
});
