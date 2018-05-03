import Controller from '@ember/controller';
import { get, computed } from '@ember/object';
import { inject as service } from '@ember/service';
import { sort } from '@ember/object/computed';

export default Controller.extend({
  blog: service(),
  url: service(),

  init() {
    this._super(...arguments);
    this.postSorting = ['date:desc'];
  },

  sortedPosts: sort('model.posts', 'postSorting'),
  relatedPosts: computed('model.post.id', 'sortedPosts', function() {
    return this.sortedPosts.filter((post) => {
      if (get(post, 'id') === get(this, 'model.post.id')) {
        return false
      }
      return get(post, 'primaryTag') === get(this, 'model.post.primaryTag')
    });
  }),

  prevPost: computed('model.post.id', 'sortedPosts', function() {
    let index = this.sortedPosts.indexOf(get(this, 'model.post'));

    if (index > 0) {
      return this.sortedPosts.get(index - 1);
    }
  }),

  nextPost: computed('model.post.id', 'sortedPosts', function() {
    let index = this.sortedPosts.indexOf(get(this, 'model.post'));

    if (index < (get(this, 'sortedPosts.length') - 1)) {
      return this.sortedPosts.get(index + 1);
    }
  }),


  tagBackgroundImageStyle: computed(function() {
    if (get(this, 'model.post.primaryTag.image')) {
      return `background-image: url(${get(this, 'url.prefix')}${get(this, 'model.post.primaryTag.image')})`;
    } else if (get(this, 'blog.coverImage')) {
      return `background-image: url(${get(this, 'url.prefix')}${get(this, 'blog.coverImage')})`;
    }
  })
})
