import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('post', { path: ':id' });
  this.route('page', { path: '/page/:id' });
  this.route('author', { path: '/author/:id'});
  this.route('tag', { path: '/tag/:id' });
});

export default Router;
