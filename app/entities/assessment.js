'use strict';

var Backbone = require('backbone'),
  Bus = require('../core/bus'),
  Config = require('../core/config');


/********** MODEL **********/
var Assessment = Backbone.Model.extend({
  urlRoot: Config.baseUrl + "assessments",

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
var AssessmentCollection = Backbone.Collection.extend({
  url: Config.baseUrl + "assessments",
  model: Assessment,
  parse: function(response, options) {
    return response.data;
  }
});


/********** CONTROLLER **********/
var API = {
  getAssessmentEntities: function(options) {
    var assessments = new AssessmentCollection();
    var defer = $.Deferred();
    assessments.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      }
    }));
    return defer.promise();
  },

  getAssessmentEntity: function(id, options) {
    var assessment = new Assessment({
      id: id
    });
    var defer = $.Deferred();
    assessment.fetch($.extend({}, options, {
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
Bus.reqres.setHandler("assessment:entities", function(options) {
  return API.getAssessmentEntities(options);
});

Bus.reqres.setHandler("assessment:entity", function(id, options) {
  return API.getAssessmentEntity(id, options);
});

Bus.reqres.setHandler("assessment:entity:new", function(id) {
  return new Assessment();
});


/********** EXPORTS **********/
module.exports = {
  Assessment: Assessment,
  AssessmentCollection: AssessmentCollection
}
