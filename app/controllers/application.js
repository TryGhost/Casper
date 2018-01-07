import Controller from '@ember/controller';

import { computed } from '@ember/object';

export default Controller.extend({
  now: computed(function() {
    return new Date();
  })
})
