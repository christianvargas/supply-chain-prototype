'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  ManagementViews = require('./views/management'),
  ExposureView = require('./views/exposure'),
  Syphon = require('backbone.syphon'),
  Bus = require('../../../../core/bus'),
  Notifications = require('../../../../core/notifications'),
  livestamp = require('kuende-livestamp'),
  datepicker = require('bootstrap-datepicker');


var CompanyView = Marionette.ItemView.extend({
  template: require('./templates/prototype/view4.hbs'),
});

module.exports = CompanyView;
