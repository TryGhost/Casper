import DS from 'ember-data';
import { get, computed } from '@ember/object';

export default DS.Model.extend({
  title: DS.attr('string'),
  content: DS.attr('string'),
  html: DS.attr('string'),

  image: DS.attr('string'),
  featured: DS.attr('boolean'),
  status: DS.attr('string'),
  date: DS.attr('date'),
  tags: DS.attr(),

  primaryTag: computed('tags.[]', function() {
    return get(this, 'tags.firstObject');
  }),

  author: DS.belongsTo('author'),
});
