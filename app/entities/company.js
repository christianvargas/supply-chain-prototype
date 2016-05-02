'use strict';

var Backbone = require('backbone'),
  Bus = require('../core/bus'),
  Config = require('../core/config');


/********** MODEL **********/
var Company = Backbone.Model.extend({
  urlRoot: Config.baseUrl + "companies",

  url: function() {
    return this.urlRoot + ((this.id !== undefined) ? ("/" + this.id) : "");
  },

  validate: function(attrs, options) {
    var errors = {}
  },

  parse: function(response, options) {
    if (options.collection) {
      return response;
    }
    return response.data;
  }
});


/********** COLLECTION **********/
var CompanyCollection = Backbone.Collection.extend({
  url: Config.baseUrl + "companies",
  model: Company,

  parse: function(response, options) {
    return response.data;
  }
});


/********** COLLECTION **********/
var API = {
  getCompanyEntities: function(options) {
    var companies = new CompanyCollection();
    var defer = $.Deferred();
    companies.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      }
    }));
    return defer.promise();
  },

  getCompanyEntity: function(companyId, options) {
    var company = new Company({
      id: companyId
    });
    var defer = $.Deferred();
    company.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      },
      error: function(data) {
        defer.resolve(undefined);
      }
    }));
    return defer.promise();
  },

  getCompanyEngagementEntities: function(options) {
    var companies = new CompanyCollection();
    companies.url += '/engagement';
    var defer = $.Deferred();
    companies.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      }
    }));
    return defer.promise();
  },

};


/********** EVENTS **********/
Bus.reqres.setHandler("company:entities", function(options) {
  return API.getCompanyEntities(options);
});

Bus.reqres.setHandler("company:entity", function(id, options) {
  return API.getCompanyEntity(id, options);
});

Bus.reqres.setHandler("company:entity:new", function(id) {
  return new Company();
});

Bus.reqres.setHandler("company:entities:engagement", function(options) {
  return API.getCompanyEngagementEntities(options);
});


/********** EXPORTS **********/
module.exports = {
  Company: Company,
  CompanyCollection: CompanyCollection
}
