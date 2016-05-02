'use strict';

var Marionette = require('backbone.marionette'),
  Bus = require('../../core/bus'),
  App = require('../../app'),
  ShowController = require('./show/controller');

/********** API **********/
var controller = new ShowController({
  region: Bus.reqres.request('header_region')
});


/********** EVENTS **********/
Bus.commands.setHandler("header:show", function() {
  controller.showHeader();
});
Bus.commands.setHandler("header:hide", function() {
  controller.hideHeader();
});
Bus.commands.setHandler("header:set:active", function(url) {
  $('.main-nav').find('li').add('a').removeClass('active');
  $('.main-nav').find('a[href$="' + url + '"]').closest('li').addClass('active');
});



/********** APP ROUTES **********/
var HeaderRouter = Marionette.AppRouter.extend({
  controller: controller
});


/********** APPLICATION **********/
App.addInitializer(function(){
  new HeaderRouter()
});
