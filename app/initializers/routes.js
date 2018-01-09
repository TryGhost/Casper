import Router from '../router';

export function initialize() {
  Router.map(function() {
    this.route('post', { path: ':id' });
    this.route('page', { path: '/page/:id' });
    this.route('author', { path: '/author/:id'});
    this.route('tag', { path: '/tag/:id' });
  });
}

export default {
  initialize
};
