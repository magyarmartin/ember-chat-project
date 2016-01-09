import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        modifyError(formData) {
            // console.log(formData);
            let error = this.get('model');
            console.log(error);
            error.setProperties(formData);
            return error.save().then(() => {
                this.transitionToRoute('errors.list');
            });
        }
    }
});

