import HeadData from 'ember-meta/services/head-data';
import { computed, get } from '@ember/object';
import { getOwner } from '@ember/application';

import config from '../config/environment';

import { getExcerpt } from '../helpers/excerpt';

export default HeadData.extend({
  author: computed('routeName', function() {
    return this.get('currentRouteModel.author.name');
  }),

  currentRouteModel: computed('routeName', function() {
    return getOwner(this).lookup(`route:${this.get('routeName')}`).get('currentModel.post');
  }),

  description: computed('routeName', function() {
    let currentModel = this.get('currentRouteModel');

    if(currentModel && get(currentModel, 'html')) {
      const excerpt = getExcerpt(get(currentModel, 'html'), {
        words: 33
      })
      return `${excerpt}...`;
    }

    return config['ember-meta'].description;
  }),

  url: computed('routeName', function() {
    let url = config['ember-meta'].url;
    const slug = this.get('currentRouteModel.id');
    if (slug) {
      url = `${url}${slug}/`;
    }
    return url;
  }),

  categories: computed('routeName', function() {
    return this.get('currentRouteModel.tags');
  }),

  date: computed('routeName', function() {
    return this.get('currentRouteModel.date');
  }),

  canonical: computed('routeName', function() {
    return this.get('currentRouteModel.canonical');
  }),

  title: computed('routeName', function() {
    return this.getWithDefault('currentRouteModel.title', config['ember-meta'].title);
  }),
});
