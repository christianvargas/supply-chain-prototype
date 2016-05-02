'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Bus = require('../../core/bus'),
  Notifications = require('../../core/notifications'),
  App = require('../../app');


/********** API **********/
var API = {
  showLogin: function(){
    var ShowController = require('./show/controller');
    var controller = new ShowController();
    controller.showForm();
  },

  showForgotPassword: function(){
    var ForgotController = require('./forgot/controller');
    var controller = new ForgotController();
    controller.showForm();
  },

  showResetPassword: function(token){
    var ForgotController = require('./forgot/controller');
    var controller = new ForgotController();
    controller.showReset(token);
  }
}


/********** EVENTS **********/
Bus.commands.setHandler("login:show", function() {
  API.showLogin();
  return Backbone.history.navigate('login', {
    trigger: true
  });
});

Bus.commands.setHandler("login:redirect", function() {
  Notifications.warning('You have been logged out due to inactivity', 'Please log back in to continue');
  return Backbone.history.navigate('login', {
    trigger: true
  });
});

Bus.commands.setHandler("login:forgot:password", function(){
  API.showForgotPassword();
});

Bus.commands.setHandler('logout', function() {
  var auth = Bus.reqres.request('auth');
  auth.logout();
  Bus.commands.execute("user:profile:entity:reset");
  Notifications.info('Logout successful', 'You have successfully been logged out');
  return Backbone.history.navigate('login', {
    trigger: true
  });
});


/********** APP ROUTES **********/
var LoginRouter = Marionette.AppRouter.extend({
  appRoutes: {
    "login": "showLogin",
    "reset-password/(:token)": "showResetPassword"
  },
  controller: API
});


/********** APPLICATION **********/
App.addInitializer(function(){
  new LoginRouter()
});
