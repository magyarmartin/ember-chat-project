import Ember from 'ember';

export default Ember.Controller.extend({
    succesfulRegistration: false,
    succesfulLogin: false,
    user: '',
    actions: {
      send() {
        let email = Ember.$("#email").val();
        let password = Ember.$("#pwd").val();
        let confPassword = Ember.$("#conf-pwd").val();
        let self = this;
        if ( this.get('validatePassword')(password) && 
          this.get('validatePasswordConfirmation')(password, confPassword)){
            self.store.queryRecord('user', { filter: { email: email } }).then(function(user) {
            if (user.length > 0){
                Ember.$("#email-error").show();
                Ember.$("#email-error p").text("This username is already taken, please choose an other one");
            } else {
                var newUser = self.store.createRecord('user', {
                    email: email,
                    password: password
                });
                newUser.save();
                Ember.$('#sign-up').modal('hide');
                self.set('succesfulRegistration', true);
                setTimeout(function() {
                    self.set('succesfulRegistration', false);
                }, 3000);
            }
          });
          }
      },
      login() {
          let email = Ember.$('#login-email').val();
          let pwd = Ember.$('#login-pwd').val();
          let self = this;
          this.store.queryRecord('user', { filter: { email: email, password: pwd } }).then(function(user) {
            if (user.length > 0){
                self.set('succesfulLogin', true);
                Ember.$('#log-in').modal('hide');
                self.set('user', user[0]);
                setTimeout(function() {
                    Ember.$('#login-success').hide();
                }, 3000);
            } else {
                Ember.$("#login-error").show();
                Ember.$("#login-error p").text('Wrong username or password, try an othe one!')
            }
          });
      },
      logout(){
          this.set('succesfulLogin', false);
          this.set('user', '');
      }
  },
  validatePassword(pwd) {
      if (pwd.length < 4) {
          Ember.$("#pwd-error").show();
          Ember.$("#pwd-error p").text("The password's length must be at least 4 character");
          return false;
      }
      return true;
  },
  validatePasswordConfirmation(pwd, pwdConf) {
      if (pwd !== pwdConf) {
          Ember.$("#pwd-conf-error").show();
          Ember.$("#pwd-conf-error p").text("The password confirmation and the password must be the same");
          return false;
      }
      return true;
  },
});
