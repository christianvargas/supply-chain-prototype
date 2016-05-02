'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Config = require('../../../core/config'),
  Bus = require('../../../core/bus'),
  Notifications = require('../../../core/notifications'),
  fileDownload = require('jquery-file-download'),
  _ = require('underscore'),
  underscoreString = require('underscore.string');

var PrototypeRiskView = Marionette.ItemView.extend({
  template: require('./templates/prototype/risk-rating.hbs')
});

var LayoutView = Marionette.LayoutView.extend({
  template: require('./templates/layout.hbs'),
  listView: require('./views/list'),
  portfolioListView: require('./views/portfolio_list'),
  chartView: null,

  regions: {
    chart: "#exposure-chart",
    list: "#exposure-list"
  },

  currentSortColumn: 'industryGap',
  currentSortAscending: false,
  currentView: 'portfolio',

  initialize: function(){
    Bus.commands.execute("sidebar:set:active", '/#/exposure');
    $('#sidebar-menu li.subdrop').find('a').removeClass('active');
    $('#sidebar-menu li.subdrop').find('a[href$="/#/exposure/'+this.model.get('id')+'"]').addClass('active');
  },

  onBeforeShow: function() {
    window.scrollTo(0, 0);
  },

  onShow: function() {
    $('button[data-exposure-type=portfolio]').addClass('active');
    this.loadPortfolioView();
  },

  events: {
    'click button[data-exposure-type]': 'changeExposure',
    'click a.excel-export': 'downloadExcelReport',
    'click a.chart-export': 'downloadCurrentChart'
  },

  changeExposure: function(e) {
    $('button[data-exposure-type]').removeClass('active');
    $(e.target).addClass('active');

    var selected = $(e.target).data('exposure-type');
    this.currentView = selected;
    switch (selected) {
      case 'portfolio':
        return this.loadPortfolioView();
      case 'industry':
        return this.loadSectorView();
      case 'country':
        return this.loadCountryView();
    }
  },

  downloadExcelReport: function(e) {
    e.preventDefault();

    var auth = Bus.reqres.request('auth');
    var path = Config.baseUrl + 'portfolio/export-excel/'+this.model.get('id');

    // set notification
    Notifications.info('Download in progress', 'The portfolio exposure report is being downloaded');

    // trigger download
    $.fileDownload(path, {
      data: {
        'access_token': auth.getAccessToken(),
        'include': 'assetCountry,revenueCountry'
      }
    }).done(function() {
      Notifications.success('Download Complete', 'The company excel report has been downloaded successfully');
    }).fail(function() {
      Notifications.error('Download failed', 'There was en error in downloading the report. Please try again.');
    });
  },

  downloadCurrentChart: function(e) {
    e.preventDefault();
    var chart = $('#chart').highcharts();
    chart.exportChart();
  },

  loadPortfolioView: function() {
    $('.chart-title').html('ESG Risk Exposure');
    var view = new this.portfolioListView({
      collection: this.collection
    });
    this.list.show(view);

    this.chartView = require('./views/portfolio_chart');
    this.displayChart(this.collection);
  },

  loadSectorView: function() {
    $('.chart-title').html('Industry Exposure');
    var sectorCollection = this.collection.groupBy(function(model) {
      return model.get('industry').data.name;
    });
    sectorCollection = this.processCollection(sectorCollection);
    this.displayList(sectorCollection);

    this.chartView = require('./views/industry_chart');
    this.displayChart(this.collection);
  },

  loadCountryView: function() {
    $('.chart-title').html('Geographic Exposure');
    var countryCollection = this.collection.groupBy(function(model) {
      return model.get('headquarterCountry').data.name;
    });
    countryCollection = this.processCollection(countryCollection);

    this.chartView = require('./views/country_chart');
    this.displayChart(countryCollection);

    this.displayList(countryCollection);
  },

  displayList: function(collection) {
    this.list.show(new this.listView({
      collection: collection
    }));
    $(window).trigger('resize');

  },

  displayChart: function(collection) {
    this.chart.show(new this.chartView({
      model: collection
    }));
  },

  processCollection: function(collection) {
    var data = [];
    for (var key in collection) {

      var array = collection[key];

      var totalExposure = array.reduce(function(a, b) {
        return a + b.get('exposureRating').totalRisk;
      }, 0);

      var maxExposure = Math.max.apply(Math,
        array.map(function(model) {
          return model.get('exposureRating').totalRisk;
        })
      );

      var minExposure = Math.min.apply(Math,
        array.map(function(model) {
          return model.get('exposureRating').totalRisk;
        })
      );

      data.push({
        id: underscoreString.slugify(key),
        name: key,
        numItems: array.length,
        maxExposure: parseFloat(maxExposure).toFixed(2),
        minExposure: parseFloat(minExposure).toFixed(2),
        totalExposure: parseFloat(totalExposure).toFixed(2),
        avgExposure: parseFloat(totalExposure / array.length).toFixed(2),
        range: parseFloat(maxExposure - minExposure),
        models: array
      });
    }

    var newCollection = new Backbone.Collection(data);
    newCollection.comparator = function(model) {
      return model.get('totalExposure') * -1;
    };
    newCollection.sort();
    return newCollection;
  },

  childEvents: {
    'sort:collection': 'onChildSortCollection'
  },

  onChildSortCollection: function(childView, e) {
    var selected = $(e.target).closest('th').data('sort');
    this.currentSortColumn = selected;
    this.currentSortAscending = !this.currentSortAscending;
    var multiplier = this.currentSortAscending ? 1 : -1;

    switch (selected) {
      case 'name':
        if (this.currentSortAscending) {
          this.collection.comparator = function(model) {
            return model.get(selected);
          }
        } else {
          this.collection.comparator = function(a, b) {
            if (a.get(selected) > b.get(selected)) return -1;
            if (a.get(selected) < b.get(selected)) return 1;
            return 0;
          }
        }
        break;
      case 'industry':
      case 'headquarterCountry':
        if (this.currentSortAscending) {
          this.collection.comparator = function(model) {
            return model.get(selected).data.name;
          }
        } else {
          this.collection.comparator = function(a, b) {
            if (a.get(selected).data.name > b.get(selected).data.name) return -1;
            if (a.get(selected).data.name < b.get(selected).data.name) return 1;
            return 0;
          }
        }
        break;

      case 'totalRisk':
      case 'adjustedBaselineImpact':
      case 'incidentImpact':
      case 'industryGap':
        this.collection.comparator = function(model) {
          return model.get('exposureRating')[selected] * multiplier;
        };
        break;

      case 'preparednessRating':
        this.collection.comparator = function(model) {
          return model.get(selected) * multiplier;
        };
        break;

      case 'group-name':
      case 'group-numItems':
      case 'group-totalExposure':
      case 'group-minExposure':
      case 'group-maxExposure':
      case 'group-avgExposure':
        var groupName = (this.currentView == 'country' ? 'headquarterCountry' : 'industry');
        var field = selected.substring(6);
        var collection = this.collection.groupBy(function(model) {
          return model.get(groupName).data.name;
        });
        collection = this.processCollection(collection);
        if (field == 'name') {
          if (this.currentSortAscending) {
            collection.comparator = function(model) {
              return model.get(field);
            }
          } else {
            collection.comparator = function(a, b) {
              if (a.get(field) > b.get(field)) return -1;
              if (a.get(field) < b.get(field)) return 1;
              return 0;
            }
          }
        } else {
          collection.comparator = function(model) {
            return model.get(field) * multiplier;
          };
        }
        collection.sort();

        return this.displayList(collection);
        break;
    }

    this.collection.sort();

    // re-render the table
    if ($(e.target).closest('table').attr('id') == 'companyListTable') {
      this.displayChart(this.collection);
    }

  }

});

module.exports = {
  Layout: LayoutView,
  RiskRating: PrototypeRiskView
};
