'use strict';

var Marionette = require('backbone.marionette'),
  Bus = require('../../../core/bus'),
  View = require('./view');


/********** CONTROLLER **********/
var LoginController = Marionette.Controller.extend({
  initialize: function(){
    $('body').addClass('login-page');
    $('#content-wrapper').removeClass('content-page');
    Bus.commands.execute('header:hide');
    Bus.commands.execute('sidebar:hide');
  },

  showForm: function() {
    var self = this;
    var region = Bus.reqres.request("main_region");
    var view = new View();

    view.on("submit:form", function(data){
      self.submitForm(data);
    });

    region.show(view);
  },

  submitForm: function(data) {
    var region = Bus.reqres.request("main_region");
    $('body').removeClass('login-page');
    $('#content-wrapper').addClass('content-page');
    Bus.commands.execute('header:show');
    Bus.commands.execute('sidebar:show');
    return Bus.commands.execute('redirect:home');

    var errors = {};
    if (data.username.trim().length == 0) {
      errors.username = true;
    }
    if (data.password.trim().length == 0) {
      errors.password = true;
    }
    if (Object.keys(errors).length > 0) {
      region.currentView.triggerMethod("form:data:invalid", errors);
      return region.currentView.unlockSubmit();
    }

    var auth = Bus.reqres.request('auth');
    return auth.login(data.username, data.password, (function(_this) {
      return function() {
        region.reset();
        $('body').removeClass('login-page');
        $('#content-wrapper').addClass('content-page');
        Bus.commands.execute('header:show');
        Bus.commands.execute('sidebar:show');
        return Bus.commands.execute('redirect:home');
      };
    })(this), (function(_this) {
      return function() {
        new View().displayAuthenticationError();
      };
    })(this));
  }

});

module.exports = LoginController;
