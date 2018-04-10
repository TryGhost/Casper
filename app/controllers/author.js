import Controller from '@ember/controller';

import { get, computed } from '@ember/object';

export default Controller.extend({
  coverImageStyle: computed('model.cover', function() {
    return `background-image: url(${get(this, 'model.cover')})`
  })
})
