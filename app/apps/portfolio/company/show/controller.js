'use strict';

var Marionette = require('backbone.marionette'),
  Bus = require('../../../../core/bus'),
  Layout = require('./view');


/********** ENTITIES **********/
require('../../../../entities/company');
require('../../../../entities/resource');


/********** CONTROLLER **********/
var ShowController = Marionette.Controller.extend({
  initialize: function() {
    Bus.commands.execute('sidebar:set:active', '/#/portfolio');
  },

  displayCompany: function(id) {
      var region = Bus.reqres.request("main_region");
      region.show(new Layout({}));
  }
});

module.exports = ShowController;
