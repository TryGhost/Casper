import Controller from '@ember/controller';

import { get, computed } from '@ember/object';

export default Controller.extend({
  coverImageStyle: computed('cover_image', function() {
    return `background-image: url(${get(this, 'cover_image')})`
  })
})
