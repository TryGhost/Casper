import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import PostMetaMixin from 'ember-meta/mixins/post-meta';
import { get } from '@ember/object';
import { getExcerpt } from '../helpers/excerpt';

export default Route.extend(PostMetaMixin, {
  classNames: ["post-template"],

  init() {
    this._super(...arguments);
    this.attributeReferences = {
      author: 'author.name',
      categories: 'tags',
      description(model) {
        const excerpt = getExcerpt(get(model, 'html'), {
          words: 33
        })
        return `${excerpt}...`;
      },
      url(model, globalConfig) {
        return `${globalConfig.url}${model.id}/`
      },
    };
  },

  model(params) {
    return hash({
      post:  this.store.queryRecord('content', {
        path: params.id,
      }),
      posts: this.store.query('content', {
        path: 'content',
      })
    }).then((result) => {
      return this.store.findRecord('author', get(result, 'post.author.id')).then(() => result);
    })
  },

  afterModel(model) {
    this._super(model.post);
  },

  actions: {
    didTransition() {
      this._super();
      if(window && window.scrollTo) {
        window.scrollTo(0,0);
      }
    }
  }
});
