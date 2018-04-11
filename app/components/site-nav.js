import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { get, computed } from '@ember/object';

export default Component.extend({
  blog: service(),
  router: service(),
  url: service(),
  tagName: '',

  rssFeed: computed('blog.host', function() {
    return `https://feedly.com/i/subscription/feed${encodeURIComponent('/' + get(this, 'blog.host') + '/rss.xml')}`;
  })
})
