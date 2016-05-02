'use strict';

var Marionette = require('backbone.marionette'),
  Bus = require('../../../core/bus'),
  Data = require('../../../core/data');


/********** CONTROLLER **********/
var HeaderController = Marionette.Controller.extend({
  showHeader: function() {
    var region = Bus.reqres.request("header_region");
    var View = require('./view');
    region.show(new View({
      data: Data,
    }));
  },

  hideHeader: function() {
    var region = Bus.reqres.request("header_region");
    if (region.hasView()) {
      region.empty();
    }
  }
});

module.exports = HeaderController;
