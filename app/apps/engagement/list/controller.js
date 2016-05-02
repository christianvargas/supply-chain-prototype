'use strict';

var Marionette = require('backbone.marionette'),
	Entities = require('../../../entities/company'),
	Bus = require('../../../core/bus'),
	ListView = require('./view');

/********** CONTROLLER **********/
var ListController = Marionette.Controller.extend({
	initialize:  function(){
		Bus.commands.execute('sidebar:set:active', '/#/engagement');
	},

  listCompanies: function(){
    if (Bus.reqres.request('needs:login')) {
      return;
    }
  	var fetchingCompanies = Bus.reqres.request('company:entities:engagement', {
			data: $.param({
				include:'industry,headquarterCountry,currentAssessment'
			})
		});

  	$.when(fetchingCompanies).done(function(companies){
  		var companiesListView = new ListView({
  			collection: companies
  		});

  		var region = Bus.reqres.request("main_region");
  		region.show(companiesListView);
  	});
  }
});

module.exports = ListController;
