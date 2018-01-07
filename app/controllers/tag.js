import Controller from '@ember/controller';

import { get, computed } from '@ember/object';

export default Controller.extend({
  coverImageStyle: computed('tag.feature_image', function() {
    return `background-image: url(${get(this, 'tag.feature_image')})`
  })
})
