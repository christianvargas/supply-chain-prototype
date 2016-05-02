var Marionette = require('backbone.marionette'),
  Bus = require('../../core/bus'),
  App = require('../../app'),
  ShowController = require('./show/controller');


/********** API **********/
var controller = new ShowController({
  region: Bus.reqres.request('sidebar_region')
});


/********** EVENTS **********/
Bus.commands.setHandler("sidebar:show", function() {
  controller.showSidebar();
});

Bus.commands.setHandler("sidebar:hide", function() {
  controller.hideSidebar();
});


/********** APP ROUTES **********/
var SidebarRouter = Marionette.AppRouter.extend({
  controller: controller
});


/********** APPLICATION **********/
App.addInitializer(function(){
  new SidebarRouter()
});
