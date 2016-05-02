'use strict';

var Marionette = require('backbone.marionette'),
  Syphon = require('backbone.syphon'),
  Bus = require('../../../core/bus'),
  Notifications = require('../../../core/notifications');

var commonView = Marionette.ItemView.extend({
  events: {
    "click button.btn-submit": "onSubmit",
    "keypress input": "keyPressed"
  },

  keyPressed: function(e) {
    if (e.which === 13) {
      e.preventDefault();
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
    return $('.btn-submit').attr('disabled', true);
  },

  unlockSubmit: function() {
    return $('.btn-submit').attr('disabled', false);
  }
});

var form = commonView.extend({
  template: require('./templates/form.hbs')
});

var reset = commonView.extend({
  template: require('./templates/reset.hbs')
});

module.exports = {
  Form: form,
  Reset: reset,
}
