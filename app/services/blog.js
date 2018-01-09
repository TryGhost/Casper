import Service from '@ember/service';
import { computed, get } from '@ember/object';

import config from '../config/environment';

function configParam(param) {
  return computed(function() {
    return get(config, `blog.${param}`);
  })
}

export default Service.extend({
  title: configParam('title'),
  description: configParam('description'),
  logo: configParam('logo'),
  cover_image: configParam('cover'),
  navigation: configParam('navigation'),
});
