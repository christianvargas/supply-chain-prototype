'use strict';

var Marionette = require('backbone.marionette'),
  chartColors = require('../../../../core/chart_colors'),
  _ = require('underscore');

module.exports = Marionette.CompositeView.extend({
  template: require('../templates/industry_chart.hbs'),

  onShow: function() {
    // group the collection by the industry name
    var sectorCollection = this.model.groupBy(function(model, index, collection) {
      return model.get('industry').data.name;
    });

    // sum total risk for each
    var sectors = [];
    for (var key in sectorCollection) {
      var total = sectorCollection[key].reduce(function(previous, current) {
        return previous + current.get('exposureRating').totalRisk
      }, 0);

      sectors.push({
        name: key,
        total: total
      });
    }

    // sort descending
    sectors.sort(function(a, b) {
      return b.total - a.total;
    });

    // add sectors to data array for chart
    var data = [];
    sectors.forEach(function(sector, index) {
      data.push({
        id: sector.name,
        name: sector.name,
        color: chartColors.industryTreemap[index]
      })
    });

    // add companies to data array
    this.model.map(function(model) {
      data.push({
        id: model.get('id'),
        name: model.get('name'),
        parent: model.get('industry').data.name,
        value: model.get('exposureRating').totalRisk
      });
    });

    // setup highcharts
    var highchartsOptions = {
      chart: {
        backgroundColor: 'rgba(255, 255, 255, 0.001)',
        height: 320
      },
      credits: {
        position: {
          align: 'right',
        	x: -10,
        	verticalAlign: 'bottom',
        	y: -5
        }
      },
      plotOptions: {
        treemap: {
          stacking: 'normal',
          point: {
            events: {
              click: function() {
                return location.href = '/#/portfolio/company/' + this.id;
              }
            }
          }
        }
      },
      series: [{
        fillOpacity: 0.20,
        borderWidth: 2,
        borderColor: '#3C444E',
        type: "treemap",
        layoutAlgorithm: 'stripes',
        allowDrillToNode: false,
        levelIsConstant: false,
        alternateStartingDirection: true,
        dataLabels: {
          enabled: true,
          align: 'right',
          verticalAlign: 'bottom',
          style: {
            fontSize: '10px',
            color: '#FFFFFF',
            textShadow: "0px",
            fontWeight: "normal"
          }
        },
        levels: [{
          level: 1,
          borderWidth: 5,
          layoutAlgorithm: 'strip',
          dataLabels: {
            enabled: true,
            align: 'left',
            verticalAlign: 'top',
            style: {
              fontSize: '10px',
              color: '#FFFFFF',
              textShadow: "0px",
              fontWeight: "bold"
            }
          }
        }],
        data: data
      }]
    };
    $('#industry-chart').highcharts(highchartsOptions);
  }
});
