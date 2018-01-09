import Component from '@ember/component';
import { inject as service } from '@ember/service';

// import { get, computed } from '@ember/object';

export default Component.extend({
  blog: service(),
  router: service(),
  tagName: '',
})
