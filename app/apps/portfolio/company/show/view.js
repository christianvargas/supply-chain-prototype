'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  ManagementViews = require('./views/management'),
  ExposureView = require('./views/exposure'),
  Syphon = require('backbone.syphon'),
  Bus = require('../../../../core/bus'),
  Notifications = require('../../../../core/notifications'),
  livestamp = require('kuende-livestamp'),
  datepicker = require('bootstrap-datepicker');


var CompanyView = Marionette.ItemView.extend({
  template: require('./templates/prototype/overview.hbs'),

  events: {
    'click button[data-exposure-type]': 'changeView',
  },

  onShow: function(){
    this.loadOverview();
  },

  changeView: function(e) {
    $('button[data-exposure-type]').removeClass('active');
    $(e.target).addClass('active');

    var selected = $(e.target).data('exposure-type');
    switch( selected ){
      case 'overview':
        this.loadOverview();
        break;

      case 'exposure':
        this.loadExposure();
        break;

      case 'management':
        this.loadManagement();
        break;

      case 'issues':
        this.loadIssues();
        break;
    }
  },

  loadOverview: function(){
    this.template = require('./templates/prototype/overview.hbs');
    this.render();

    // Build the chart
    $('#revenue').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 200,
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            // layout: 'vertical',
        },
        series: [{
            name: 'Revenue',
            colorByPoint: true,
            data: [{
                name: 'China',
                y: 23,
            }, {
                name: 'Europe',
                y: 8,
            }, {
                name: 'Corporate',
                y: 40,
            }]
        }]
    });

    // Build the chart
    $('#assets').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            height: 200,
        },
        title: {
            text: null
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        credits: {
          enabled: false,
        },
        exporting: {
          enabled: false,
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                showInLegend: true
            }
        },
        legend: {
            // layout: 'vertical',
        },
        series: [{
            name: 'Assets',
            colorByPoint: true,
            data: [{
                name: 'China',
                y: 23,
            }, {
                name: 'Europe',
                y: 8,
            }]
        }]
    });
  },

  loadExposure: function(){
    this.template = require('./templates/prototype/exposure.hbs');
    this.render();
  },

  loadManagement: function(){
    this.template = require('./templates/prototype/management.hbs');
    this.render();
  },

});

module.exports = CompanyView;
