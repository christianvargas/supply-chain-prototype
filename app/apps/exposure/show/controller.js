'use strict';

var Backbone = require('backbone'),
	Marionette = require('backbone.marionette'),
	Bus = require('../../../core/bus'),
	Views = require('./view');


/********** ENTITIES **********/
var CompanyEntity = require('../../../entities/company');
require('../../../entities/resource');


/********** CONTROLLER **********/
var ShowController = Marionette.Controller.extend({
	initialize: function(){
		Bus.commands.execute('sidebar:set:active', '/#/exposure');
	},

  displayFund: function(id){
		console.log('displayFund');
		var view = new Views.RiskRating({
		});

		// get the main region & layout
		var region = Bus.reqres.request("main_region");
    region.show(view);
  }
});

module.exports = ShowController;
