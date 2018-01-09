import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  image: DS.attr('string'),
  cover: DS.attr('string'),
  bio: DS.attr('string'),
  website: DS.attr('string'),
  location: DS.attr('string'),

  posts: DS.hasMany('content'),
});
