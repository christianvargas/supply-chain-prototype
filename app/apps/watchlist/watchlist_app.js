var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Bus = require('../../core/bus'),
  App = require('../../app');


/********** API **********/
var API = {
  list: function() {
    var Controller = require('./list/controller');
    var controller = new Controller();
    controller.list();
  },
  show: function() {
    var Controller = require('./show/controller');
    var controller = new Controller();
    controller.show();
  }
}


/********** EVENTS **********/
Bus.commands.setHandler("watchlist:list", function() {
  Backbone.history.navigate("watchlist");
  API.list();
});


/********** APP ROUTES **********/
var DashboardRouter = Marionette.AppRouter.extend({
  appRoutes: {
    "watchlist": "list",
    "watchlist/:id": "show",
  },
  controller: API
});


/********** APPLICATION **********/
App.addInitializer(function(){
  new DashboardRouter()
});
