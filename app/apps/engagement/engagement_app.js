'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Bus = require('../../core/bus'),
  App = require('../../app');


/********** API **********/
var API = {
  listCompanies: function() {
    var ListController = require('./list/controller');
    var controller = new ListController();
    controller.listCompanies();
  },
}


/********** EVENTS **********/
Bus.commands.setHandler("engagement:list", function() {
  Backbone.history.navigate("engagement");
  API.listCompanies();
});


/********** APP ROUTES **********/
var EngagementRouter = Marionette.AppRouter.extend({
  appRoutes: {
    "engagement": "listCompanies",
  },
  controller: API
});


/********** APPLICATION **********/
App.addInitializer(function(){
  new EngagementRouter()
});
