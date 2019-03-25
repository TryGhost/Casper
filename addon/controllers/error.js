import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
  blog: service(),
  error: computed('model.errors.[]', function() {
    return this.model.errors[0];
  })
});
