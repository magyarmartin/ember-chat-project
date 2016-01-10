import Ember from 'ember';

export default Ember.Controller.extend({
    applicationController: Ember.inject.controller('application'),
    user: Ember.computed.reads('applicationController.user'),
    isLogedIn: Ember.computed.reads('applicationController.succesfulLogin'),
    changablePost: null,
    deleteFail: false,
    actions: {
        sendPost() {
            let text = Ember.$("#comment").val();
            let user = this.get('user');
            let comment = this.store.createRecord('post', {
                text: text,
                user: user
            });
            comment.save();
        },
        deletePost(post) {
            let self = this;
            if (this.get('user').get('email') === post.get('user').get('email')){
                post.deleteRecord();
                post.get('isDeleted');
                post.save();
            } else {
                self.set('deleteFail', true);
                setTimeout(function() {
                    self.set('deleteFail', false);
                }, 3000);
            }
        },
        editDialog(post) {
            if (this.get('user').get('email') === post.get('user').get('email')){
                Ember.$("#edit-comment").val(post.get('text'));
                this.set('changablePost', post);
            }
        },
        editPost(){
            let post = this.get('changablePost');
            let self = this;
            if (post !== null){
                let text = Ember.$("#edit-comment").val();
                let post = this.get('changablePost');
                post.set('text', text);
                post.save();
                self.set('changablePost', null);
            }
            self.set('deleteFail', true);
                setTimeout(function() {
                    self.set('deleteFail', false);
                }, 3000);
            Ember.$('#edit').modal('hide');
        }
    }
});
