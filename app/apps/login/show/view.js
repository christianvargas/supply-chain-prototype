'use strict';

var Marionette = require('backbone.marionette'),
  Syphon = require('backbone.syphon'),
  Bus = require('../../../core/bus'),
  Notifications = require('../../../core/notifications'),
  _ = require('underscore');

var View = Marionette.ItemView.extend({
  template: require('./templates/login_form.hbs'),
  events: {
    "click button.btn-login": "onSubmit",
    "keypress input": "keyPressed",
    "click a.forgot-password": "showForgot"
  },

  keyPressed: function(e) {
    if (e.which === 13) {
      return this.submitForm()
    }
  },

  onSubmit: function(e) {
    e.preventDefault();
    this.submitForm();
  },

  submitForm: function() {
    this.lockSubmit();
    var data = Syphon.serialize(this);
    this.trigger('submit:form', data);
  },

  lockSubmit: function() {
    return $('.btn-login').attr('disabled', true);
  },

  unlockSubmit: function() {
    return $('.btn-login').attr('disabled', false);
  },

  displayAuthenticationError: function() {
    Notifications.error('Invalid login credentials', 'The email and/or password provided is incorrect. Please try again.');
    return this.unlockSubmit();
  },

  onFormDataInvalid: function(errors) {
    var $view = this.$el;
    var clearFormErrors = function() {
      var $form = $view.find("form");
      $form.find(".has-error").each(function() {
        $(this).removeClass("has-error");
      });
    }

    var markErrors = function(value, key) {
      var $controlGroup = $view.find("#" + key).parent();
      $controlGroup.addClass("has-error");
    }

    clearFormErrors();
    _.each(errors, markErrors);
  },

  showForgot: function(e){
    e.preventDefault();
    Bus.commands.execute("login:forgot:password");
  }
});

module.exports = View;
