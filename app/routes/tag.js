import Route from '@ember/routing/route';
import { hash } from 'rsvp';
import { getWithDefault } from '@ember/object';

export default Route.extend({
  model(params) {
    return hash({
      tag: params.id,
      posts: this.store.query('content', {
        path: 'content',
      }).then((posts) => posts.filter((post) => getWithDefault(post, 'tags', []).includes(params.id)))
    })
  }
});
