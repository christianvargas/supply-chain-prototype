'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Bus = require('../../core/bus'),
  App = require('../../app');


/********** API **********/
var API = {
  /*
  listPortfolio: function() {
    var ListController = require('./list/controller');
    var controller = new ListController();
    controller.listPortfolio();
  },
  */

  showCompany: function(id) {
    var ShowController = require('./company/show/controller');
    var controller = new ShowController();
    controller.displayCompany(id);
  },

  /*
  newCompany: function(){
    var EditController = require('./company/edit/controller');
    var controller = new EditController();
    controller.addCompany();
  },

  editCompany: function(id) {
    var EditController = require('./company/edit/controller');
    var controller = new EditController();
    controller.editCompany(id);
  },

  importPortfolio: function() {
    var ImportController = require('./import/controller');
    var controller = new ImportController();
    controller.displayWizard();
  }
  */
}


/********** EVENTS **********/
/*
Bus.commands.setHandler("portfolio:list", function() {
  Backbone.history.navigate("portfolio");
  API.listPortfolio();
});
*/
Bus.commands.setHandler("portfolio:company:show", function(id) {
  Backbone.history.navigate("portfolio/company/" + id, {
    trigger: true
  });
  API.showCompany(id);
});

/*
Bus.commands.setHandler("portfolio:company:edit", function(id) {
  API.editCompany(id);
});

Bus.commands.setHandler("portfolio:company:new", function() {
  API.newCompany();
});
*/

/********** APP ROUTES **********/
var PortfolioRouter = Marionette.AppRouter.extend({
  appRoutes: {
    // "portfolio": "listPortfolio",
    "portfolio/company(/:id)": "showCompany",
    // "portfolio/import": "importPortfolio"
  },
  controller: API
});


/********** APPLICATION **********/
App.addInitializer(function(){
  new PortfolioRouter()
});
