import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        let posts = this.store.findAll('post');
        return posts;
    }
});
