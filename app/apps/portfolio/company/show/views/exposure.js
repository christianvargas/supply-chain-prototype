'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Bus = require('../../../../../core/bus'),
  Config = require('../../../../../core/config'),
  Notifications = require('../../../../../core/notifications'),
  chartColors = require('../../../../../core/chart_colors'),
  fileDownload = require('jquery-file-download');


// exposure view
var ExposureView = Marionette.ItemView.extend({
  template: require('../templates/exposure/overview.hbs'),
  templateHelpers: function() {
    return {
      issues: this.options.resources.get('issues').data
    }
  },

  events: {
    "click a.export-excel": "downloadExcelReport",
  },

  downloadExcelReport: function(e) {
    e.preventDefault();

    var auth = Bus.reqres.request('auth');
    var path = Config.baseUrl + 'companies/' + this.model.get('id') + '/export-excel';

    Notifications.info('Download in progress', 'The company report is being downloaded');

    $.fileDownload(path, {
      data: {
        'access_token': auth.getAccessToken(),
        'include': 'assessments.indicators,articles.incident,industry.issues,assetCountry,revenueCountry'
      }
    }).done(function() {
      Notifications.success('Download Complete', 'The company excel report has been downloaded successfully');
    }).fail(function() {
      Notifications.error('Download Failed', 'There was en error in downloading the report. Please try again.');
    });
  },

  onShow: function() {
    this.showExposureBreakdown();
  },

  showExposureBreakdown: function() {
    var categories = this.model.get('exposureRating').adjustedBaselineIssues.map(function(issue) {
      return issue.name;
    });

    var count = 0;
    var highchartsOptions = {
      chart: {
        polar: true
      },

      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      pane: {
        startAngle: 0
      },

      xAxis: {
        categories: categories,
        labels: {
          enabled: false
        },
        lineColor: '#EEEEEE',
        lineWidth: 1,
        gridLineColor: '#EEEEEE'
      },

      legend: {
        enabled: false
      },

      yAxis: {
        lineWidth: 0,
        min: 0,
        max: 10,
        tickInterval: 2,
        labels: {
          enabled: false
        },
        gridLineWidth: 1,
        gridLineColor: '#EEEEEE'
      },

      plotOptions: {
        column: {
          pointPadding: 0,
          groupPadding: 0
        },
        line: {
          lineWidth: 0,
          states: {
            hover: {
              lineWidth: 0,
              lineWidthPlus: 0
            }
          },
          marker: {
            fillColor: '#B3B3B3',
            lineColor: 'rgba(255,255,255,0.5)',
            lineWidth: 2
          }
        }
      },

      tooltip: {
        shared: true,
        pointFormat: '<span>{series.name}: <b>{point.y:,.2f}</b><br/>'
      },

      series: [{
        name: 'Company Risk',
        data: this.model.get('exposureRating').adjustedBaselineIssues.map(function(issue) {
          return issue.businessImpact;
        }),
        type: 'column',
        pointPlacement: 'between',
        color: chartColors.countryBaseline,
        colorByPoint: true
      }, {
        name: 'Market Risk',
        data: this.model.get('exposureRating').adjustedBaselineIssues.map(function(issue) {
          return issue.baselineBusinessImpact;
        }),
        type: 'line',
        pointPlacement: 'between',
        color: 'rgba(255,255,255,0)',
      }]
    };
    $('#country-sector-exposure-chart').highcharts(highchartsOptions);
  }
});

module.exports = ExposureView
