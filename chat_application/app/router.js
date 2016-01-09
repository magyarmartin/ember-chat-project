import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('index', {path: '/'});

  this.route('errors', function() {
    this.route('list');
    this.route('view', {path: '/:error_id'});
    this.route('new');
    this.route('edit', {path: '/edit/:error_id'});
  });
  this.route('comment');
});

export default Router;
