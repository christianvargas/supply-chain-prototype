'use strict';

var Marionette = require('backbone.marionette'),
  Bus = require('../../../core/bus'),
  Notifications = require('../../../core/notifications'),
  Config = require('../../../core/config'),
  View = require('./view');

/********** CONTROLLER **********/
var ForgotController = Marionette.Controller.extend({
  initialize: function(){
    $('body').addClass('login-page');
    $('#content-wrapper').removeClass('content-page');
    Bus.commands.execute('header:hide');
    Bus.commands.execute('sidebar:hide');
  },

  showForm: function() {
    var region = Bus.reqres.request("main_region");
    var formView = new View.Form();

    formView.on("submit:form", function(data){
      return $.ajax({
        url: Config.baseUrl + 'forgot-password',
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function(response){
          Notifications.success('Forgot Password', 'A link to reset your password has been sent to: ' + response.data.email);
          Bus.commands.execute('login:show');
        },
        error: function(){
          Notifications.error('Forgot Password', 'User not found. Please try again.');
          formView.render();
        }
      });
    });

    region.show(formView);
  },

  showReset: function(token){
    var region = Bus.reqres.request("main_region");
    var resetView = new View.Reset();

    resetView.on("submit:form", function(data){
      return $.ajax({
        url: Config.baseUrl + 'reset-password/' + token,
        type: 'POST',
        dataType: 'json',
        data: data,
        success: function(response){
          Notifications.success('Reset Password', 'Your password has been successfully reset. A confirmation email has been sent to: ' + response.data.email);
          Bus.commands.execute('login:show');
        },
        error: function(){
          Notifications.error('Reset Password', 'Invalid request. Please try again.');
          resetView.render();
        }
      });
    });

    region.show(resetView);
  }
});

module.exports = ForgotController;
