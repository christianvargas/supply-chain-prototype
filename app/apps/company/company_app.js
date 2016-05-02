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
Bus.commands.setHandler("company:show", function() {
  Backbone.history.navigate("company");
  API.show();
});


/********** APP ROUTES **********/
var CompanyRouter = Marionette.AppRouter.extend({
  appRoutes: {
    "company": "show"
  },
  controller: API
});


/********** APPLICATION **********/
App.addInitializer(function(){
  new CompanyRouter()
});
