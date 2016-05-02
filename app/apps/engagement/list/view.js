'use strict';

var Marionette = require('backbone.marionette'),
  Bus = require('../../../core/bus'),
  _ = require('underscore');


/********** ENTITIES **********/
require('../../../entities/assessment');


// item
var Item = Marionette.ItemView.extend({
  template: require('./templates/item.hbs'),
  tagName: 'tr',

  events: {
    'click td.link': 'viewCompany',
    'click a.engage': 'engageCompany',
    'click a.review-indicators': 'reviewIndicators',
    'click a.create-assessment': 'createAssessment',
    'click a.cancel-engage': 'cancelEngagement'
  },

  initialize: function() {
    this.model.bind('change', this.render, this);
  },

  viewCompany: function(e){
    e.preventDefault();
    e.stopPropagation();
    Bus.commands.execute('portfolio:company:show', this.model.get('id'));
  },

  engageCompany: function(e) {
    e.preventDefault();
    this.model.set({
      engagement_status: 'scheduled',
    });
    this.model.save();
  },

  cancelEngagement: function(e) {
    e.preventDefault();
    this.model.set({
      engagement_status: null
    });
    this.model.save();
    this.remove();
  },

  reviewIndicators: function(e) {
    e.preventDefault();
    Bus.commands.execute("resource:indicator:list:modal", this.model.get('industry').data.id);
  },

  createAssessment: function(e) {
    e.preventDefault();
    var assessment = Bus.reqres.request("assessment:entity:new");
    assessment.save({
      companyId: this.model.get('id')
    }, {
      success: function() {
        Bus.commands.execute("assessment:view", assessment.get('id'));
      }
    });
  },
});

// list
var List = Marionette.CompositeView.extend({
  template: require('./templates/list.hbs'),
  childView: Item,
  childViewContainer: 'tbody',

  initialize: function() {
    if ( this.collection.length == 0 ){
      this.template = require('./templates/empty.hbs');
    }
  }
});

module.exports = List;
