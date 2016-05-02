'use strict';

var Marionette = require('backbone.marionette'),
  Bus = require('../../../../core/bus');

var listItem = Marionette.ItemView.extend({
  tagName: 'tr',
  template: require('../templates/portfolio_list_item.hbs'),

  events: {
    'click td.link': 'viewCompany',
    'click a.engage': 'engageCompany',
    'click a.review-indicators': 'reviewIndicators',
    'click a.request-assessment': 'requestAssessment',
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
  },

  reviewIndicators: function(e) {
    e.preventDefault();
    Bus.commands.execute("resource:indicator:list:modal", this.model.get('industry').data.id);
  },

  requestAssessment: function(e) {
    e.preventDefault();
    Bus.commands.execute("assessment:request", this.model.get('id'));
  },
});

var list = Marionette.CompositeView.extend({
  template: require('../templates/portfolio_list.hbs'),
  childView: listItem,
  childViewContainer: 'tbody',

  events: {
    'click th[data-sort]': 'sortCollection'
  },

  sortCollection: function(e) {
    this.triggerMethod('sort:collection', e);
  }
});

module.exports = list;
