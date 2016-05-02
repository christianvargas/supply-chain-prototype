'use strict';

var Marionette = require('backbone.marionette'),
  Data = require('../../../core/data'),
  Bus = require('../../../core/bus');


/********** CONTROLLER **********/
var SidebarController = Marionette.Controller.extend({
  showSidebar: function() {
    var region = Bus.reqres.request("sidebar_region");
    var View = require('./view');
    var view = new View({
      data: Data
    });
    region.show(view);
  },

  hideSidebar: function() {
    var region = Bus.reqres.request("sidebar_region");
    if (region.hasView()) {
      region.empty();
    }
  }
});

module.exports = SidebarController;
