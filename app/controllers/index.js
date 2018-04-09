import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

import { get, computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default Controller.extend({
  blog: service(),
  url: service(),

  coverImageStyle: computed('blog.coverImage', function() {
    return htmlSafe(`background-image: url(${get(this, 'url.prefix')}${get(this, 'blog.coverImage')})`);
  })
})
