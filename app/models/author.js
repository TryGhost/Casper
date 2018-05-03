import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  image: DS.attr('string'),
  coverImage: DS.attr('string'),
  coverMeta: DS.attr(),
  bio: DS.attr('string'),
  website: DS.attr('string'),
  twitter: DS.attr('string'),
  facebook: DS.attr('string'),
  location: DS.attr('string'),

  posts: DS.hasMany('content'),
});
