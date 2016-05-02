'use strict';

var Marionette = require('backbone.marionette'),
  chartColors = require('../../../../core/chart_colors');

module.exports = Marionette.CompositeView.extend({
  template: require('../templates/portfolio_charts.hbs'),

  initialize: function(){
    this.currentChart = 'risk_management';
  },

  events: {
    'click a.company-risk': 'showRiskAndManagementChart',
    'click a.risk-premium': 'showRiskPremiumChart'
  },

  onShow: function() {
    if( this.currentChart == 'risk_management' ){
      this.showRiskAndManagementChart();
    } else {
      this.showRiskPremiumChart();
    }
  },

  showRiskAndManagementChart: function(e){
    this.currentChart = 'risk_management';
    $('.risk-premium').removeClass('active');
    $('.risk-premium-legend').addClass('hidden');
    $('.company-risk').addClass('active');
    $('.company-risk-legend').removeClass('hidden');

    var preparednessRatings = this.model.map(function(model) {
      return parseFloat(model.get('preparednessRating') * -1);
    });

    var highchartsOptions = {
      chart: {
        backgroundColor: 'rgba(255, 255, 255, 0.001)',
        height: 320,
        margin: [10,0,30,30]
      },
      xAxis: {
        min: 0,
        lineColor: '#4D545E',
        gridLineColor: '#4D545E',
        categories: this.model.pluck('name'),
        labels: {
          enabled: true,
          autoRotation: 0,
          rotation: 0,
          style: {
            fontSize: '11px',
            color: chartColors.label
          },
          useHTML: true,
          formatter: function(){
            return this.value.toString().truncate(15, true);
          }
        },
        tickLength: 0
      },
      yAxis: {
        min: Math.min.apply(null, preparednessRatings) == 0 ? 0 : -10,
        max: 10,
        lineColor: '#4D545E',
        gridLineColor: '#4D545E',
        opposite: false,
        tickInterval: Math.min(preparednessRatings) == 0 ? 1 : 2,
        reversedStacks: false,
        title: {
          text: 'Exposure Level'
        },
        labels: {
          style: {
            color: chartColors.axis
          },
          formatter: function() {
            return Math.abs(this.value);
          }
        },
        reversed: false
      },
      title: {
        text: null
      },
      legend: {
        enabled: false,
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        padding: 3,
        itemMarginTop: 5,
        itemMarginBottom: 5,
        itemStyle: {
          color: '#94989F',
          fontSize: 10
        },
        reversed: true,
        y: 150
      },
      tooltip: {
        shared: true,
        formatter: function(){
          var display = '<strong>' + this.x + '</strong><br />';

          // scatter plot specific output
          if( this.series !== undefined && this.series.options.type == 'scatter' ){
            return display + this.series.name + '<br />' + this.point.name + ': ' + this.point.val;
          }

          this.points.map(function(point){
            display += point.series.name + ': ' + parseFloat(Math.abs(point.point.val)).toFixed(2) + '<br />';
          });
          return display;
        }
      },
      plotOptions: {
        column: {
          dataLabels: {
            style: {
              color: chartColors.label,
              fontWeight: 'normal',
              textShadow: "0px"
            },
          },
          point: {
            events: {
              click: function() {
                return location.href = '/#/portfolio/company/' + this.id;
              }
            }
          },
        },
        columnrange: {
          // stacking: 'normal',
          point: {
            events: {
              click: function() {
                return location.href = '/#/portfolio/company/' + this.id;
              }
            }
          },
        },
        scatter: {
          marker: {
            lineColor: 'rgba(255,255,255,0.5)',
            lineWidth: 2
          }
        }
      },
      series: [{
        type: 'column',
        name: 'Company Risk',
        data: this.model.map(function(model) {
          var value = model.get('exposureRating').adjustedBaselineImpact;
          return {
            id: model.get('id'),
            y: parseFloat(value),
            val: parseFloat(value),
            color: chartColors.adjustedBaseline.hex
          }
        }),
        color: 'rgba('+chartColors.adjustedBaseline.rgb+',0.6)',
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          style: {
            color: chartColors.label,
            fontWeight: 'normal',
            textShadow: "0px"
          },
        }
      }, {
        type: 'columnrange',
        name: 'ESG Management Score',
        data: this.model.map(function(model) {
          var value = parseFloat(model.get('preparednessRating'));
          var low = value > 0 ? -0.25 : null;
          var high = value > 0 ? value * -1 : null;
          return {
            id: model.get('id'),
            low: low,
            high: high,
            val: high,
            color: chartColors.management.hex
          };
        }),
        color: chartColors.management.hex,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          style: {
            color: chartColors.label,
            fontWeight: 'normal',
            textShadow: "0px"
          },
          formatter: function () {
            if (this.y === this.point.high && this.point.high < 0) {
              return Math.abs(this.point.val);
            }
          }
        }
      }, {
        name: 'Market Risk',
        type: 'scatter',
        zIndex: 20,
        color: '#3C444F',
        data: this.model.map(function(model, index) {
          var baseline = parseFloat(model.get('exposureRating').baselineBusinessImpact);
          return {
            name: model.get('industry').data.name,
            x: index,
            y: baseline,
            val: parseFloat(baseline).toFixed(2)
          }
        })
      }]
    };
    $('#chart').highcharts(highchartsOptions);
  },

  showRiskPremiumChart: function(){
    this.currentChart = 'risk_premium';
    $('.company-risk').removeClass('active');
    $('.company-risk-legend').addClass('hidden');
    $('.risk-premium').addClass('active');
    $('.risk-premium-legend').removeClass('hidden');

    var highchartsOptions = {
      chart: {
        backgroundColor: 'rgba(255, 255, 255, 0.001)',
        height: 320,
        margin: [10,0,30,40]
      },
      xAxis: {
        min: 0,
        lineColor: '#4D545E',
        gridLineColor: '#4D545E',
        categories: this.model.pluck('name'),
        labels: {
          enabled: true,
          autoRotation: 0,
          rotation: 0,
          style: {
            fontSize: '11px',
            color: chartColors.label
          },
          useHTML: true,
          formatter: function(){
            return this.value.toString().truncate(15, true);
          }
        },
        tickLength: 0
      },
      yAxis: {
        min: -50,
        max: 50,
        lineColor: '#4D545E',
        gridLineColor: '#4D545E',
        opposite: false,
        tickInterval: 10,
        reversedStacks: false,
        title: {
          text: 'Exposure Level'
        },
        labels: {
          style: {
            color: chartColors.axis
          },
          formatter: function() {
            return this.value + '%';
          }
        },
        reversed: false
      },
      title: {
        text: null
      },
      legend: {
        enabled: false,
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        padding: 3,
        itemMarginTop: 5,
        itemMarginBottom: 5,
        itemStyle: {
          color: '#94989F',
          fontSize: 10
        },
        reversed: true,
        y: 150
      },
      tooltip: {
        shared: true,
        formatter: function(){
          var display = '<strong>' + this.x + '</strong><br />';
          this.points.map(function(point){
            display += point.series.name + ': ' + parseFloat(point.point.y).toFixed(2) + '% <br />';
          });
          return display;
        }
      },
      plotOptions: {
        column: {
          point: {
            events: {
              click: function() {
                return location.href = '/#/portfolio/company/' + this.id;
              }
            }
          },
        }
      },
      series: [{
        type: 'column',
        name: 'Risk Premium',
        data: this.model.map(function(model) {
          var value = model.get('exposureRating').industryGap;
          return {
            id: model.get('id'),
            y: parseFloat(value),
            color: chartColors.returnByRiskPremium(value)
          }
        }),
        showInLegend: false,
        borderWidth: 0,
        dataLabels: {
          enabled: true,
          style: {
            color: chartColors.label,
            fontWeight: 'normal',
            textShadow: "0px"
          },
          formatter: function () {
            return this.point.y + '%';
          }
        }
      },{
        type: 'columnrange',
        name: 'Above Market',
        color: chartColors.red,
        data: []
      },{
        type: 'columnrange',
        name: 'Below Market',
        color: chartColors.green,
        data: []
      }]
    };

    $('#chart').highcharts(highchartsOptions);
  }

});
