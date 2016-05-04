'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Bus = require('../../../../../core/bus'),
  Notifications = require('../../../../../core/notifications'),
  chartColors = require('../../../../../core/chart_colors'),
  fileDownload = require("jquery-file-download"),
  Syphon = require('backbone.syphon');


/********** ENTITIES **********/
require('../../../../../entities/assessment');
var AssessmentIndicatorEntity = require('../../../../../entities/assessment_indicator');


// assessment indicator view
var AssessmentIndicatorView = Marionette.ItemView.extend({
  template: require('../templates/management/assessment_indicator.hbs'),
  tagName: "tr",

  initialize: function(options) {
    this.model.set({
      questionNumber: options.childIndex + 1,
    });
  },

  templateHelpers: function() {
    return {
      indicatorBenchmarks: this.options.indicatorBenchmarks
    }
  },

  events: {
    "click a.download-file": "downloadFile"
  },

  downloadFile: function(e) {
    e.preventDefault();

    var name = $(e.target).data('original-name');
    var auth = Bus.reqres.request('auth');
    var path = this.model.url() + '/file?name=' + name;

    // request file
    $.fileDownload(path, {
      data: {
        'access_token': auth.getAccessToken()
      }
    }).fail(function() {
      Notifications.error('Download Failed', 'There was en error in downloading the file. Please try again.');
    });
  }

});


// assessment view
var AssessmentView = Marionette.CompositeView.extend({
  template: require('../templates/management/overview.hbs'),

  templateHelpers: function() {
    return {
      categoryBenchmarks: this.options.industry.categoryBenchmarks
    }
  },

  childViewOptions: function(model, index) {
    return {
      childIndex: index,
      indicatorBenchmarks: this.options.industry.indicatorBenchmarks,
    }
  },

  events: {
    "click button.view-assessment": "viewAssessment",
    "click a.review-indicators": "reviewIndicators"
  },

  reviewIndicators: function() {
    Bus.commands.execute("resource:indicator:list:modal", this.options.industry.id);
  },

  initialize: function() {
    if (this.model.get('status') == 'submitted') {
      this.collection = new AssessmentIndicatorEntity.AssessmentIndicatorCollection(this.model.get('indicators').data);
      this.childView = AssessmentIndicatorView;
      this.childViewContainer = '#indicators-container';
    }
  },

  viewAssessment: function() {
    Bus.commands.execute("assessment:view", this.model.get('id'));
  },

  onShow: function() {
    this.displayDistributionChart();
  },

  displayDistributionChart: function() {
    var counts = this.options.industry.indicatorCounts;
    var chart = new Highcharts.Chart({
      chart: {
        renderTo: 'indicator-distribution-chart',
        type: 'pie',
        height: 160,
        margin: [10, 0, 0, 0]
      },

      plotOptions: {
        pie: {
          colors: [chartColors.environmental, chartColors.social, chartColors.governance],
          innerSize: '80%',
          dataLabels: {
            enabled: true,
            inside: true,
            connectorColor: 'white',
            distance: 2,
            useHTML: true,
            formatter: function(){
              return this.y;
            },
            style: {
              fontWeight: 'normal'
            }
          }
        }
      },
      series: [{
        name: 'Indicators',
        data: [
          ['Environmental', counts.E],
          ['Social', counts.S],
          ['Governance', counts.G]
        ]
      }]
    });


  }
});

module.exports = {
  AssessmentView: AssessmentView
}
