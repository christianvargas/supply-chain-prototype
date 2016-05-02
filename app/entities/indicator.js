'use strict';

var Backbone = require('backbone'),
    Bus = require('../core/bus'),
    Config = require('../core/config');


/********** MODEL **********/
var Indicator = Backbone.Model.extend();


/********** COLLECTION **********/
var IndicatorCollection = Backbone.Collection.extend({
  initialize: function(models, options){
    this.industryId = options.industryId;
  },

  url: function(industryId){
    return Config.baseUrl + "resources/indicators" + (this.industryId !== undefined ? "/" + this.industryId : "");
  },

  model: Indicator,

  parse: function(response, options){
    return response.data;
  }
});


/********** CONTROLLER **********/
var API = {
  getIndicatorEntities: function(industryId, options){
    var entities = new IndicatorCollection([], {
      industryId: industryId
    });
    var defer = $.Deferred();
    entities.fetch($.extend({}, options, {
      success: function(data){
        defer.resolve(data);
      }
    }));
    return defer.promise();
  }
};


/********** EVENTS **********/
Bus.reqres.setHandler("indicator:entities", function(industryId, options){
  return API.getIndicatorEntities(industryId, options);
});


/********** EXPORTS **********/
module.exports = {
  IndicatorCollection: IndicatorCollection
};
