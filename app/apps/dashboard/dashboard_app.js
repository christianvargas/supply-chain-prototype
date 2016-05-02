var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Bus = require('../../core/bus'),
  App = require('../../app');


/********** API **********/
var API = {
  show: function() {
    var Controller = require('./show/controller');
    var controller = new Controller();
    controller.show();
  }
}


/********** EVENTS **********/
Bus.commands.setHandler("dashboard:show", function() {
  Backbone.history.navigate("dashboard");
  API.show();
});


/********** APP ROUTES **********/
var DashboardRouter = Marionette.AppRouter.extend({
  appRoutes: {
    "dashboard": "show"
  },
  controller: API
});


/********** APPLICATION **********/
App.addInitializer(function(){
  new DashboardRouter()
});
