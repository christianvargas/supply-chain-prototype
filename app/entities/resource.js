'use strict';

var Backbone = require('backbone'),
  Bus = require('../core/bus'),
  Config = require('../core/config'),
  resources = null;


/********** MODEL **********/
var ResourceCollection = Backbone.Model.extend({
  url: Config.baseUrl + "resources/all",
  // model: Backbone.Model,
  parse: function(response, options) {
    var data = response.data;

    this.countries = new Backbone.Collection(data.countries.data);
    this.industries = new Backbone.Collection(data.industries.data);
    this.issues = new Backbone.Collection(data.issues.data);
    this.glossary = new Backbone.Collection(data.glossary.data);

    return data;
  }
});


/********** CONTROLLER **********/
var API = {
  getResourceEntities: function(options) {
    if (resources === null) {
      var collection = new ResourceCollection();
      var defer = $.Deferred();
      collection.fetch($.extend({}, options, {
        success: function(data) {
          defer.resolve(data);
        }
      }));
      resources = defer.promise();
    }
    return resources;
  }
};


/********** EVENTS **********/
Bus.reqres.setHandler("resource:entities", function(options) {
  return API.getResourceEntities(options);
});


/********** EXPORTS **********/
module.exports = ResourceCollection;
