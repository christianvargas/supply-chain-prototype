'use strict';

var Backbone = require('backbone'),
  Bus = require('../core/bus'),
  Config = require('../core/config'),
  CompanyEntity = require('./company');


/********** MODEL **********/
var Fund = Backbone.Model.extend({
  urlRoot: Config.baseUrl + "funds",

  url: function() {
    return this.urlRoot + "/" + this.id;
  },

  validate: function(attrs, options) {
    var errors = {}
  },

  initialize: function() {
  },

  parse: function(response, options) {
    if (options.collection) {
      return response;
    }

    return response.data;
  }
});


/********** COLLECTION **********/
var FundCollection = Backbone.Collection.extend({
  url: Config.baseUrl + "funds",
  model: Fund,
  parse: function(response, options) {
    return response.data;
  }
});


/********** CONTROLLER **********/
var API = {
  getFundEntities: function(options) {
    var funds = new FundCollection();
    var defer = $.Deferred();
    funds.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      }
    }));
    return defer.promise();
  },

  getFundEntity: function(fundId, options) {
    var fund = new Fund({
      id: fundId
    });
    var defer = $.Deferred();
    fund.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      },
      error: function(data) {
        defer.resolve(undefined);
      }
    }));
    return defer.promise();
  }
};


/********** EVENTS **********/
Bus.reqres.setHandler("fund:entities", function(options) {
  return API.getFundEntities(options);
});

Bus.reqres.setHandler("fund:entity", function(id, options) {
  return API.getFundEntity(id, options);
});

Bus.reqres.setHandler("fund:entity:new", function(id) {
  return new Fund();
});


/********** EXPORTS **********/
module.exports = {
  Fund: Fund,
  FundCollection: FundCollection
}
