'use strict';

var Marionette = require('backbone.marionette'),
  Bus = require('../../../core/bus'),
  Data = require('../../../core/data'),
  View = require('./view');

/********** CONTROLLER **********/
var Controller = Marionette.Controller.extend({
  initialize: function() {
    Bus.commands.execute('header:set:active', '/#/watchlist');
  },

  show: function() {
    var view = new View({
      data: Data
    });

    var region = Bus.reqres.request("main_region");
    region.show(view);
  }
});

module.exports = Controller;
