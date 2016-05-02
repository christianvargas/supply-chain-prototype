'use strict';

var Backbone = require('backbone'),
  Bus = require('../core/bus'),
  Config = require('../core/config');


/********** MODEL **********/
var AssessmentIndicator = Backbone.Model.extend({
  urlRoot: Config.baseUrl + "assessments",

  url: function() {
    return this.urlRoot + "/" + this.attributes.assessmentId + "/indicators" + "/" + this.id;
  },

  validate: function(attrs, options) {
    var errors = {}
  },

  parse: function(response, options) {
    return response.data;
  }
});


/********** COLLECTION **********/
var AssessmentIndicatorCollection = Backbone.Collection.extend({
  url: function() {
    return this.urlRoot + "/" + this.attributes.assessmentId + "/indicators";
  },
  model: AssessmentIndicator,
  parse: function(response, options) {
    return response.data;
  }
});


/********** EXPORTS **********/
module.exports = {
  AssessmentIndicator: AssessmentIndicator,
  AssessmentIndicatorCollection: AssessmentIndicatorCollection
}
