'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Config = require('../../../core/config'),
  Bus = require('../../../core/bus'),
  Notifications = require('../../../core/notifications'),
  fileDownload = require('jquery-file-download'),
  _ = require('underscore'),
  underscoreString = require('underscore.string'),
  chartColors = require('../../../core/chart_colors');


var PrototypeRiskView = Marionette.ItemView.extend({
  template: require('./templates/prototype/risk-rating.hbs'),

  events: {
    'click button[data-exposure-type]': 'changeExposure',
  },

  onShow: function(){
    this.loadRiskRating();
  },

  changeExposure: function(e) {
    $('button[data-exposure-type]').removeClass('active');
    $(e.target).addClass('active');

    var selected = $(e.target).data('exposure-type');
    switch( selected ){
      case 'risk-rating':
        this.loadRiskRating();
        break;

      case 'sub-industry':
        this.loadSubIndustry();
        break;

      case 'country':
        this.loadCountry();
        break;

      case 'issues':
        this.loadIssues();
        break;
    }
  },

  loadRiskRating: function(){
    this.template = require('./templates/prototype/risk-rating.hbs');
    this.render();

    var data = [];
    [
      [161.2, 51.6], [167.5, 59.0], [159.5, 49.2], [157.0, 63.0], [155.8, 53.6],
      [170.0, 59.0], [159.1, 47.6], [166.0, 69.8], [176.2, 66.8], [160.2, 75.2],
      [172.5, 55.2], [170.9, 54.2], [172.9, 62.5], [153.4, 42.0], [160.0, 50.0],
      [147.2, 49.8], [168.2, 49.2], [175.0, 73.2], [157.0, 47.8], [167.6, 68.8],
      [159.5, 50.6], [175.0, 82.5], [166.8, 57.2], [176.5, 87.8], [170.2, 72.8],
      [174.0, 54.5], [173.0, 59.8], [179.9, 67.3], [170.5, 67.8], [160.0, 47.0],
      [154.4, 46.2], [162.0, 55.0], [176.5, 83.0], [160.0, 54.4], [152.0, 45.8],
      [162.1, 53.6], [170.0, 73.2], [160.2, 52.1], [161.3, 67.9], [166.4, 56.6],
      [168.9, 62.3], [163.8, 58.5], [167.6, 54.5], [160.0, 50.2], [161.3, 60.3],
      [167.6, 58.3], [165.1, 56.2], [160.0, 50.2], [170.0, 72.9], [157.5, 59.8],
      [167.6, 61.0], [160.7, 69.1], [163.2, 55.9], [152.4, 46.5], [157.5, 54.3],
      [168.3, 54.8], [180.3, 60.7], [165.5, 60.0], [165.0, 62.0], [164.5, 60.3],
      [156.0, 52.7], [160.0, 74.3], [163.0, 62.0], [165.7, 73.1], [161.0, 80.0],
      [162.0, 54.7], [166.0, 53.2], [174.0, 75.7], [172.7, 61.1], [167.6, 55.7],
      [151.1, 48.7], [164.5, 52.3], [163.5, 50.0], [152.0, 59.3], [169.0, 62.5],
      [164.0, 55.7], [161.2, 54.8], [155.0, 45.9], [170.0, 70.6], [176.2, 67.2],
      [170.0, 69.4], [162.5, 58.2], [170.3, 64.8], [164.1, 71.6], [169.5, 52.8],
      [163.2, 59.8], [154.5, 49.0], [159.8, 50.0], [173.2, 69.2], [170.0, 55.9],
      [161.4, 63.4], [169.0, 58.2], [166.2, 58.6], [159.4, 45.7], [162.5, 52.2],
      [159.0, 48.6], [162.8, 57.8], [159.0, 55.6], [179.8, 66.8], [162.9, 59.4],
      [161.0, 53.6], [151.1, 73.2], [168.2, 53.4], [168.9, 69.0], [173.2, 58.4],
      [171.8, 56.2], [178.0, 70.6], [164.3, 59.8], [163.0, 72.0], [168.5, 65.2],
      [166.8, 56.6], [172.7, 105.2], [163.5, 51.8], [169.4, 63.4], [167.8, 59.0],
      [159.5, 47.6], [167.6, 63.0], [161.2, 55.2], [160.0, 45.0], [163.2, 54.0],
      [162.2, 50.2], [161.3, 60.2], [149.5, 44.8], [157.5, 58.8], [163.2, 56.4],
      [172.7, 62.0], [155.0, 49.2], [156.5, 67.2], [164.0, 53.8], [160.9, 54.4],
      [162.8, 58.0], [167.0, 59.8], [160.0, 54.8], [160.0, 43.2], [168.9, 60.5],
      [158.2, 46.4], [156.0, 64.4], [160.0, 48.8], [167.1, 62.2], [158.0, 55.5],
      [167.6, 57.8], [156.0, 54.6], [162.1, 59.2], [173.4, 52.7], [159.8, 53.2],
      [170.5, 64.5], [159.2, 51.8], [157.5, 56.0], [161.3, 63.6], [162.6, 63.2],
      [160.0, 59.5], [168.9, 56.8], [165.1, 64.1], [162.6, 50.0], [165.1, 72.3],
      [166.4, 55.0], [160.0, 55.9], [152.4, 60.4], [170.2, 69.1], [162.6, 84.5],
      [170.2, 55.9], [158.8, 55.5], [172.7, 69.5], [167.6, 76.4], [162.6, 61.4],
      [167.6, 65.9], [156.2, 58.6], [175.2, 66.8], [172.1, 56.6], [162.6, 58.6],
      [160.0, 55.9], [165.1, 59.1], [182.9, 81.8], [166.4, 70.7], [165.1, 56.8],
      [177.8, 60.0], [165.1, 58.2], [175.3, 72.7], [154.9, 54.1], [158.8, 49.1],
      [172.7, 75.9], [168.9, 55.0], [161.3, 57.3], [167.6, 55.0], [165.1, 65.5],
      [175.3, 65.5], [157.5, 48.6], [163.8, 58.6], [167.6, 63.6], [165.1, 55.2],
      [165.1, 62.7], [168.9, 56.6], [162.6, 53.9], [164.5, 63.2], [176.5, 73.6],
      [168.9, 62.0], [175.3, 63.6], [159.4, 53.2], [160.0, 53.4], [170.2, 55.0],
      [162.6, 70.5], [167.6, 54.5], [162.6, 54.5], [160.7, 55.9], [160.0, 59.0],
      [157.5, 63.6], [162.6, 54.5], [152.4, 47.3], [170.2, 67.7], [165.1, 80.9],
      [172.7, 70.5], [165.1, 60.9], [170.2, 63.6], [170.2, 54.5], [170.2, 59.1],
      [161.3, 70.5], [167.6, 52.7], [167.6, 62.7], [165.1, 86.3], [162.6, 66.4],
      [152.4, 67.3], [168.9, 63.0], [170.2, 73.6], [175.2, 62.3], [175.2, 57.7],
      [160.0, 55.4], [165.1, 104.1], [174.0, 55.5], [170.2, 77.3], [160.0, 80.5],
      [167.6, 64.5], [167.6, 72.3], [167.6, 61.4], [154.9, 58.2], [162.6, 81.8],
      [175.3, 63.6], [171.4, 53.4], [157.5, 54.5], [165.1, 53.6], [160.0, 60.0],
      [174.0, 73.6], [162.6, 61.4], [174.0, 55.5], [162.6, 63.6], [161.3, 60.9],
      [156.2, 60.0], [149.9, 46.8], [169.5, 57.3], [160.0, 64.1], [175.3, 63.6],
      [169.5, 67.3], [160.0, 75.5], [172.7, 68.2], [162.6, 61.4], [157.5, 76.8],
      [176.5, 71.8], [164.4, 55.5], [160.7, 48.6], [174.0, 66.4], [163.8, 67.3]
    ].map(function(point){
      data.push([point[0]-100, point[1]]);
      data.push([point[0]-120, point[1]-23]);
      data.push([point[0]-140, point[1]-35]);
      if( point[0] > 172 ){
        data.push([point[1]-27, 0]);
      }
    });

    $('#heatmap').highcharts({
        chart: {
            type: 'scatter',
            zoomType: 'xy',
            backgroundColor: {
                linearGradient: { x1: 0, y1: 1, x2: 1, y2: 0 },
                stops: [
                    [0, 'rgb(255, 147, 30)'],
                    [0.5, 'rgb(255, 255, 255)'],
                    [1, 'rgb(0, 169, 157)']
                ]
            },
        },
        title: {
            text: null
        },
        exporting: {
        	enabled: false
        },
        credits: {
        	enabled: false
        },
        xAxis: {
            min: 0,
            max: 100,
            tickInterval: 10,
            startOnTick: true,
            endOnTick: true,
            title: {
                enabled: false,
                text: 'Height (cm)'
            },
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            labels: {
							enabled: false
						},
            gridLineWidth: 1,
            gridLineColor: 'rgba(0,0,0,0.05)',
            lineColor: 'rgba(0,0,0,0.05)',
            tickLength: 0,
        },
        yAxis: {
            min: 0,
            max: 100,
            tickInterval: 10,
            startOnTick: true,
            endOnTick: true,
            title: {
            		enabled: false,
                text: 'Weight (kg)'
            },
            labels: {
							enabled: false
						},
            gridLineWidth: 1,
            gridLineColor: 'rgba(0,0,0,0.05)',
            lineColor: 'rgba(0,0,0,0.05)',
            tickLength: 0,
        },
        legend: {
        		enabled: false,
            layout: 'vertical',
            align: 'left',
            verticalAlign: 'top',
            x: 100,
            y: 70,
            floating: true,
            backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF',
            borderWidth: 1
        },
        plotOptions: {
            scatter: {
                marker: {
                    radius: 5,
                    states: {
                        hover: {
                            enabled: true,
                            lineColor: 'rgb(60,68,79)'
                        }
                    }
                },
                states: {
                    hover: {
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<b>{series.name}</b><br>',
                    pointFormat: 'ESG Risk Exposure: {point.x:.1f}<br />ESG Management: {point.y:.1f}'
                }
            }
        },
        series: [{
            name: 'AAC Technology Holdings Inc.',
            color: 'rgba(60, 68, 79, .5)',
            data: data
					}]
    });

  },

  loadSubIndustry: function(){
    this.template = require('./templates/prototype/sub-industry.hbs');
    this.render();
  },

  loadCountry: function(){
    this.template = require('./templates/prototype/country.hbs');
    this.render();

    var data = [{
      "code": "GBR",
      "name": "United Kingdom",
      "z": "6.20",
      "color": "#FF931E",
      "minExposure": "5.15",
      "maxExposure": "8.10",
      "avgExposure": "6.20"
    }, {
      "code": "SAU",
      "name": "Saudi Arabia",
      "z": "5.81",
      "color": "#FF931E",
      "minExposure": "5.81",
      "maxExposure": "5.81",
      "avgExposure": "5.81"
    }, {
      "code": "ZAF",
      "name": "South Africa",
      "z": "4.50",
      "color": "#FF931E",
      "minExposure": "4.50",
      "maxExposure": "4.50",
      "avgExposure": "4.50"
    }, {
      "code": "USA",
      "name": "United States",
      "z": "3.73",
      "color": "#FF931E",
      "minExposure": "3.73",
      "maxExposure": "3.73",
      "avgExposure": "3.73"
    }, {
      "code": "FRA",
      "name": "France",
      "z": "3.67",
      "color": "#FF931E",
      "minExposure": "3.67",
      "maxExposure": "3.67",
      "avgExposure": "3.67"
    }, {
      "code": "ESP",
      "name": "Spain",
      "z": "3.37",
      "color": "#FF931E",
      "minExposure": "3.37",
      "maxExposure": "3.37",
      "avgExposure": "3.37"
    }, {
      "code": "DEU",
      "name": "Germany",
      "z": "3.27",
      "color": "#FF931E",
      "minExposure": "3.27",
      "maxExposure": "3.27",
      "avgExposure": "3.27"
    }];


    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=world-population-density.json&callback=?', function (mapData){

      // Initiate the chart
      $('#country-chart').highcharts('Map', {
        chart: {
          backgroundColor: 'rgba(255, 255, 255, 0.001)',
          height: 360
        },

        title: {
          text: null
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
                          // 'Total Exposure: ' + parseFloat(this.point.z).toFixed(2) + '<br />' +
                          'Lowest: ' + parseFloat(this.point.minExposure).toFixed(2) + '<br />' +
                          'Highest: ' + parseFloat(this.point.maxExposure).toFixed(2) + '<br />' +
                          'Average: ' + parseFloat(this.point.avgExposure).toFixed(2);
            return display;
          }
        },

        colorAxis: {
            min: 1,
            max: 1000,
            type: 'logarithmic'
        },

        series : [{
          data : mapData,
          mapData: Highcharts.maps['custom/world'],
          joinBy: ['iso-a2', 'code'],
          name: 'Population density',
          states: {
              hover: {
                  color: '#BADA55'
              }
          },
          tooltip: {
              valueSuffix: '/km²'
          }
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

      var chart = $('#country-chart').highcharts();
      chart.series[1].setData(data);
    });

  },

  loadIssues: function(){
    this.template = require('./templates/prototype/issues.hbs');
    this.render();

    $('#issues-chart').highcharts({
        chart: {
            type: 'column',
		        backgroundColor: 'rgba(255, 255, 255, 0.001)',
        },
        title: {
            text: null
        },
        legend: {
        	enabled: false
        },
        exporting: {
        	enabled: false
        },
        credits: {
        	enabled: false
        },
        xAxis: {
            min: 0,
            lineColor: '#4D545E',
            gridLineColor: '#4D545E',
            categories: [
                'Emissions, Effluents and Waste',
                'Health and Safety',
                'Human Rights',
                'Land Use and Biodiversity',
                'Community Relations',
                'Business Ethics',
                'Water Use',
                'Product Sustainability',
                'Energy Use and GHG Emissions',
            ],
            crosshair: true,
            labels: {
            	autoRotation: 0,
              style: {
                fontSize: '11px',
                color: '#FFFFFF'
              },
            },
            tickLength: 0
        },
        yAxis: {
            min: 0,
            max: 10,
            lineColor: '#4D545E',
            gridLineColor: '#4D545E',
            title: {
                text: null
            },
            labels: {
              style: {
                color: '#9ea1a7'
              },
            },
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f}</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {
                  enabled: true,
                  style: {
                    color: '#FFFFFF',
                    fontWeight: 'normal',
                    textShadow: "0px"
                  },
                },
            }
        },


        series: [{
            name: 'ESG Issue Exposure',
            data: [8.1, 7.7, 3.4, 2.8, 5.1, 9.2, 4.3, 3.1, 5.8],
		        color: 'rgba(255,147,30,0.6)',
        }]
    });
  }
});

module.exports = {
  RiskRating: PrototypeRiskView
};
