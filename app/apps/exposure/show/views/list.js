'use strict';

var Marionette = require('backbone.marionette'),
  chartColors = require('../../../../core/chart_colors'),
  _ = require('underscore');

var Item = Marionette.ItemView.extend({
  tagName: "tr",
  template: require('../templates/list_item.hbs'),

  onShow: function(){
    this.addChart();
  },

  addChart: function(){
    var highchartsOptions = {
      chart: {
        height: 30,
        margin: [0, 0, 0, 0],
        backgroundColor: 'rgba(255,255,255,0.001)'
      },
      xAxis: {
        min: 0,
        max: 10,
        lineColor: '#4D545E',
        lineWidth: 0,
        gridLineColor: '#4D545E',
        // categories: [this.model.get('name')],
        labels: {
          enabled: false
        },
        tickLength: 0
      },
      yAxis: {
        min: 0,
        max: 10,
        lineColor: '#4D545E',
        gridLineColor: '#4D545E',
        gridLineWidth: 0,
        opposite: true,
        tickInterval: 1,
        reversedStacks: false,
        title: {
          text: 'Exposure Level'
        },
        labels: {
          enabled: false,
          style: {
            color: '#94989F'
          }
        },
        stackLabels: {
          enabled: false
        }
      },
      title: {
        text: null
      },
      credits: {
        enabled: false
      },
      legend: {
        enabled: false
      },
      tooltip: {
        enabled: false
      },
      plotOptions: {
        bar: {
          stacking: 'normal',
          pointWidth: 30
        },
        series: {
          point: {
            events: {
              mouseOver: function() {
                var chart = this.series.chart;
                if (!chart.lbl) {
                  chart.lbl = chart.renderer.label('')
                    .attr({
                      padding: 5,
                      r: 5,
                      fill: '#999999'
                    })
                    .css({
                      color: '#FFFFFF'
                    })
                    .add();
                }
                chart.lbl
                  .show()
                  .attr({
                    text: this.name + ': ' + this.x
                  });
              }
            }
          },
          events: {
            mouseOut: function() {
              if (this.chart.lbl) {
                this.chart.lbl.hide();
              }
            }
          }
        }
      }
    };

    var options = highchartsOptions;
    options.series = [{
      name: this.model.get('name'),
      type: 'scatter',
      zIndex: 20,
      color: '#888888',
      data: this.model.get('models').map(function(model){
        return {
          name: model.get('name'),
          x: model.get('exposureRating').totalRisk,
          y: 5
        }
      })
    }];

    $('#group-chart-'+this.model.get('id')).highcharts(options);
  }
});

var List = Marionette.CompositeView.extend({
  template: require('../templates/list.hbs'),
  childView: Item,
  childViewContainer: "tbody",

  events: {
    'click th[data-sort]': 'sortCollection'
  },

  sortCollection: function(e) {
    this.triggerMethod('sort:collection', e, this.collection);
  }
});

module.exports = List;
