'use strict';

var Marionette = require('backbone.marionette'),
  chartColors = require('../../../../core/chart_colors');

module.exports = Marionette.CompositeView.extend({
  template: require('../templates/country_chart.hbs'),

  initialize: function(){
    this.currentChart = 'total_risk';
  },

  events: {
    'click a.total-risk': 'showTotalRisk',
    'click a.average-risk': 'showAverageRisk'
  },

  onShow: function() {
    if( this.currentChart == 'total_risk' ){
      this.showTotalRisk();
    } else {
      this.showAverageRisk();
    }
  },

  showTotalRisk: function(e){
    this.currentChart = 'total_risk';
    $('.average-risk').removeClass('active');
    $('.total-risk').addClass('active');

    var data = this.model.map(function(currentModel) {
      var value = parseFloat(currentModel.get('totalExposure')).toFixed(2);
      return {
        code: currentModel.get('models')[0].get('headquarterCountry').data.iso,
        name: currentModel.get('models')[0].get('headquarterCountry').data.name,
        z: value,
        color: chartColors.adjustedBaseline.hex,
        minExposure: parseFloat(currentModel.get('minExposure')).toFixed(2),
        maxExposure: parseFloat(currentModel.get('maxExposure')).toFixed(2),
        avgExposure: parseFloat(currentModel.get('avgExposure')).toFixed(2)
      };
    });

    this.showChart();
    var chart = $('#country-chart').highcharts();
    chart.series[1].setData(data);
  },

  showAverageRisk: function(e){
    this.currentChart = 'total_risk';
    $('.total-risk').removeClass('active');
    $('.average-risk').addClass('active');

    var data = this.model.map(function(currentModel) {
      var value = parseFloat(currentModel.get('avgExposure')).toFixed(2);
      return {
        code: currentModel.get('models')[0].get('headquarterCountry').data.iso,
        name: currentModel.get('models')[0].get('headquarterCountry').data.name,
        z: value,
        color: chartColors.adjustedBaseline.hex,
        minExposure: parseFloat(currentModel.get('minExposure')).toFixed(2),
        maxExposure: parseFloat(currentModel.get('maxExposure')).toFixed(2),
        avgExposure: parseFloat(currentModel.get('avgExposure')).toFixed(2)
      };
    });

    this.showChart();
    var chart = $('#country-chart').highcharts();
    chart.series[1].setData(data);
  },

  showChart: function(){
    // Initiate the chart
    $('#country-chart').highcharts('Map', {
      chart: {
        backgroundColor: 'rgba(255, 255, 255, 0.001)',
        height: 320
      },

      credits: {
        enabled: false,
        text: 'Sustainalytics.com',
        href: 'http://www.sustainalytics.com'
      },

      mapNavigation: {
        enabled: true,
        enableDoubleClickZoomTo: true,
        enableMouseWheelZoom: false,
        buttonOptions: {
          verticalAlign: 'bottom'
        }
      },

      navigation: {
        buttonOptions: {
          height: 10,
          width: 12,
          symbolFill: 'rgba(255, 255, 255, 0.001)'
        }
      },

      legend: {
        enabled: false,
        align: 'right',
        verticalAlign: 'bottom',
        layout: 'vertical',
        padding: 3,
        itemMarginTop: 5,
        itemMarginBottom: 5,
        itemStyle: {
          color: '#94989F',
          fontSize: 10
        },
        reversed: false
      },

      plotOptions: {
        map: {
          nullColor: 'rgba(255, 255, 255, 0.15)',
          borderColor: '#3C444E',
          borderWidth: 0.5
        }
      },
      tooltip: {
        shared: true,
        formatter: function(){
          var display = '<strong>' + this.key + '</strong><br />' +
                        'Total Exposure: ' + parseFloat(this.point.z).toFixed(2) + '<br />' +
                        'Lowest: ' + parseFloat(this.point.minExposure).toFixed(2) + '<br />' +
                        'Highest: ' + parseFloat(this.point.maxExposure).toFixed(2) + '<br />' +
                        'Average: ' + parseFloat(this.point.avgExposure).toFixed(2);
          return display;
        }
      },
      series: [{
        name: 'Countries',
        mapData: Highcharts.maps['custom/world-highres3'],
        enableMouseTracking: false,
        showInLegend: false
      }, {
        name: 'Total Exposure',
        type: 'mapbubble',
        // data: data,
        mapData: Highcharts.maps['custom/world-highres3'],
        joinBy: ['iso-a3', 'code'],
        minSize: 15,
        maxSize: '15%',
        dataLabels: {
          enabled: true,
          allowOverlap: false,
          // formatter: function() {
          //   return this.point.avgExposure;
          // },
          style: {
            color: "#FFFFFF",
            fontSize: "10px",
            textShadow: "0px",
            fontWeight: "normal"
          }
        },
        showInLegend: false
      }]
    });

  }
});
