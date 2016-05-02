'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Bus = require('../../core/bus'),
  App = require('../../app');

/********** API **********/
var API = {
  show: function(id) {
    var ShowController = require('./show/controller')
    var controller = new ShowController();
    controller.displayFund(id);
  }
};


/********** EVENTS **********/
Bus.commands.setHandler("exposure:show:portfolio", function() {
  Backbone.history.navigate("exposure", {
    trigger: true
  });
  API.show('portfolio');
});


/********** APP ROUTES **********/
var ExposureRouter = Marionette.AppRouter.extend({
  appRoutes: {
    "exposure(/:id)": "show"
  },
  controller: API
});


/********** APPLICATION **********/
App.addInitializer(function(){
  new ExposureRouter()
});
