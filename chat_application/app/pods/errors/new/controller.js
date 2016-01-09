import Ember from 'ember';

export default Ember.Controller.extend({
    actions: {
        newError(formData) {
            console.log(formData);
            // formData.status = 'new';
            // formData.date = Date.now().toLocaleString();
            var error = this.store.createRecord(
                'error', 
                Object.assign(
                    {
                        status: 'new',
                        //date: Date.now().toLocaleString(),
                        location: 'labor',
                        description: 'rossz'
                    }, 
                    formData
                )
            );
            error.save();
            this.transitionToRoute('errors.list');
        }
    }
});
