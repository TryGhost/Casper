import Component from '@ember/component';

import { get, computed } from '@ember/object';

export default Component.extend({
  coverImageStyle: computed('feature_image', function() {
    return `background-image: url(${this.feature_image})`;
  })
})
