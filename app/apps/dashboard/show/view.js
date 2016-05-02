'use strict';

var Marionette = require('backbone.marionette');

// item
var View = Marionette.ItemView.extend({
  template: require('./templates/view.hbs'),

  templateHelpers: function(){
    return {
      data: this.options.data
    }
  },

  onBeforeShow: function() {
    window.scrollTo(0, 0);
  },

  onShow: function(){
    this.loadMyTrend();
    this.loadMyEsg();
    this.loadCompetitors();
    // this.loadCompDaily();
  },

  events: {
    "click a.show-rrr-chart": "loadCompetitors",
    "click a.show-threads": "loadThreads",
    "click a.show-daily": "loadCompDaily",
  },

  loadThreads: function(){
    $('#rrrChart').css('display', 'none');
    $('#rrrDaily').css('display', 'none');
    $('#rrrThreads').css('display', 'block');
  },

  loadMyTrend: function(){

    var data = [{
        "date": "2015-07-27",
        "value": 13
    }, {
        "date": "2015-07-28",
        "value": 11
    }, {
        "date": "2015-07-29",
        "value": 15
    }, {
        "date": "2015-07-30",
        "value": 16
    }, {
        "date": "2015-07-31",
        "value": 18
    }, {
        "date": "2015-08-01",
        "value": 13
    }, {
        "date": "2015-08-02",
        "value": 22
    }, {
        "date": "2015-08-03",
        "value": 23
    }, {
        "date": "2015-08-04",
        "value": 20
    }, {
        "date": "2015-08-05",
        "value": 17
    }, {
        "date": "2015-08-06",
        "value": 16
    }, {
        "date": "2015-08-07",
        "value": 18
    }, {
        "date": "2015-08-08",
        "value": 21
    }, {
        "date": "2015-08-09",
        "value": 26
    }, {
        "date": "2015-08-10",
        "value": 24
    }, {
        "date": "2015-08-11",
        "value": 29
    }, {
        "date": "2015-08-12",
        "value": 32
    }, {
        "date": "2015-08-13",
        "value": 18
    }, {
        "date": "2015-08-14",
        "value": 24
    }, {
        "date": "2015-08-15",
        "value": 22
    }, {
        "date": "2015-08-16",
        "value": 18
    }, {
        "date": "2015-08-17",
        "value": 19
    }, {
        "date": "2015-08-18",
        "value": 14
    }, {
        "date": "2015-08-19",
        "value": 15
    }, {
        "date": "2015-08-20",
        "value": 12
    }, {
        "date": "2015-08-21",
        "value": 8
    }, {
        "date": "2015-08-22",
        "value": 9
    }, {
        "date": "2015-08-23",
        "value": 8
    }, {
        "date": "2015-08-24",
        "value": 7
    }, {
        "date": "2015-08-25",
        "value": 5
    }, {
        "date": "2015-08-26",
        "value": 11
    }, {
        "date": "2015-08-27",
        "value": 13
    }, {
        "date": "2015-08-28",
        "value": 18
    }, {
        "date": "2015-08-29",
        "value": 20
    }, {
        "date": "2015-08-30",
        "value": 29
    }, {
        "date": "2015-08-31",
        "value": 33
    }, {
        "date": "2015-09-01",
        "value": 42
    }, {
        "date": "2015-09-02",
        "value": 35
    }, {
        "date": "2015-09-03",
        "value": 31
    }, {
        "date": "2015-09-04",
        "value": 47
    }, {
        "date": "2015-09-05",
        "value": 52
    }, {
        "date": "2015-09-06",
        "value": 46
    }, {
        "date": "2015-09-07",
        "value": 41
    }, {
        "date": "2015-09-08",
        "value": 43
    }, {
        "date": "2015-09-09",
        "value": 40
    }, {
        "date": "2015-09-10",
        "value": 39
    }, {
        "date": "2015-09-11",
        "value": 34
    }, {
        "date": "2015-09-12",
        "value": 29
    }, {
        "date": "2015-09-13",
        "value": 34
    }, {
        "date": "2015-09-14",
        "value": 37
    }, {
        "date": "2015-09-15",
        "value": 42
    }, {
        "date": "2015-09-16",
        "value": 49
    }, {
        "date": "2015-09-17",
        "value": 46
    }, {
        "date": "2015-09-18",
        "value": 47
    }, {
        "date": "2015-09-19",
        "value": 55
    }, {
        "date": "2015-09-20",
        "value": 59
    }, {
        "date": "2015-09-21",
        "value": 58
    }, {
        "date": "2015-09-22",
        "value": 57
    }, {
        "date": "2015-09-23",
        "value": 61
    }, {
        "date": "2015-09-24",
        "value": 59
    }, {
        "date": "2015-09-25",
        "value": 67
    }, {
        "date": "2015-09-26",
        "value": 65
    }, {
        "date": "2015-09-27",
        "value": 61
    }, {
        "date": "2015-09-28",
        "value": 66
    }, {
        "date": "2015-09-29",
        "value": 69
    }, {
        "date": "2015-09-30",
        "value": 71
    }, {
        "date": "2015-10-01",
        "value": 67
    }, {
        "date": "2015-10-02",
        "value": 63
    }, {
        "date": "2015-10-03",
        "value": 46
    }, {
        "date": "2015-10-04",
        "value": 32
    }, {
        "date": "2015-10-05",
        "value": 21
    }, {
        "date": "2015-10-06",
        "value": 18
    }, {
        "date": "2015-10-07",
        "value": 21
    }, {
        "date": "2015-10-08",
        "value": 28
    }, {
        "date": "2015-10-09",
        "value": 27
    }, {
        "date": "2015-10-10",
        "value": 36
    }, {
        "date": "2015-10-11",
        "value": 33
    }, {
        "date": "2015-10-12",
        "value": 31
    }, {
        "date": "2015-10-13",
        "value": 30
    }, {
        "date": "2015-10-14",
        "value": 34
    }, {
        "date": "2015-10-15",
        "value": 38
    }, {
        "date": "2015-10-16",
        "value": 37
    }, {
        "date": "2015-10-17",
        "value": 44
    }, {
        "date": "2015-10-18",
        "value": 49
    }, {
        "date": "2015-10-19",
        "value": 53
    }, {
        "date": "2015-10-20",
        "value": 57
    }, {
        "date": "2015-10-21",
        "value": 60
    }, {
        "date": "2015-10-22",
        "value": 61
    }, {
        "date": "2015-10-23",
        "value": 69
    }, {
        "date": "2015-10-24",
        "value": 67
    }, {
        "date": "2015-10-25",
        "value": 72
    }, {
        "date": "2015-10-26",
        "value": 77
    }, {
        "date": "2015-10-27",
        "value": 75
    }, {
        "date": "2015-10-28",
        "value": 70
    }, {
        "date": "2015-10-29",
        "value": 72
    }, {
        "date": "2015-10-30",
        "value": 70
    }, {
        "date": "2015-10-31",
        "value": 72
    }, {
        "date": "2015-11-01",
        "value": 73
    }, {
        "date": "2015-11-02",
        "value": 67
    }, {
        "date": "2015-11-03",
        "value": 68
    }, {
        "date": "2015-11-04",
        "value": 65
    }, {
        "date": "2015-11-05",
        "value": 71
    }, {
        "date": "2015-11-06",
        "value": 75
    }, {
        "date": "2015-11-07",
        "value": 74
    }, {
        "date": "2015-11-08",
        "value": 71
    }, {
        "date": "2015-11-09",
        "value": 76
    }, {
        "date": "2015-11-10",
        "value": 77
    }, {
        "date": "2015-11-11",
        "value": 81
    }, {
        "date": "2015-11-12",
        "value": 83
    }, {
        "date": "2015-11-13",
        "value": 80
    }, {
        "date": "2015-11-14",
        "value": 81
    }, {
        "date": "2015-11-15",
        "value": 87
    }, {
        "date": "2015-11-16",
        "value": 82
    }, {
        "date": "2015-11-17",
        "value": 86
    }, {
        "date": "2015-11-18",
        "value": 80
    }, {
        "date": "2015-11-19",
        "value": 87
    }, {
        "date": "2015-11-20",
        "value": 83
    }, {
        "date": "2015-11-21",
        "value": 85
    }, {
        "date": "2015-11-22",
        "value": 84
    }, {
        "date": "2015-11-23",
        "value": 82
    }, {
        "date": "2015-11-24",
        "value": 73
    }, {
        "date": "2015-11-25",
        "value": 71
    }, {
        "date": "2015-11-26",
        "value": 75
    }, {
        "date": "2015-11-27",
        "value": 79
    }, {
        "date": "2015-11-28",
        "value": 70
    }, {
        "date": "2015-11-29",
        "value": 73
    }, {
        "date": "2015-11-30",
        "value": 61
    }, {
        "date": "2015-12-01",
        "value": 62
    }, {
        "date": "2015-12-02",
        "value": 66
    }, {
        "date": "2015-12-03",
        "value": 65
    }, {
        "date": "2015-12-04",
        "value": 73
    }, {
        "date": "2015-12-05",
        "value": 79
    }, {
        "date": "2015-12-06",
        "value": 78
    }, {
        "date": "2015-12-07",
        "value": 78
    }, {
        "date": "2015-12-08",
        "value": 78
    }, {
        "date": "2015-12-09",
        "value": 74
    }, {
        "date": "2015-12-10",
        "value": 73
    }, {
        "date": "2015-12-11",
        "value": 75
    }, {
        "date": "2015-12-12",
        "value": 70
    }, {
        "date": "2015-12-13",
        "value": 77
    }, {
        "date": "2015-12-14",
        "value": 67
    }, {
        "date": "2015-12-15",
        "value": 62
    }, {
        "date": "2015-12-16",
        "value": 64
    }, {
        "date": "2015-12-17",
        "value": 61
    }, {
        "date": "2015-12-18",
        "value": 59
    }, {
        "date": "2015-12-19",
        "value": 53
    }, {
        "date": "2015-12-20",
        "value": 54
    }, {
        "date": "2015-12-21",
        "value": 56
    }, {
        "date": "2015-12-22",
        "value": 59
    }, {
        "date": "2015-12-23",
        "value": 58
    }, {
        "date": "2015-12-24",
        "value": 55
    }, {
        "date": "2015-12-25",
        "value": 52
    }, {
        "date": "2015-12-26",
        "value": 54
    }, {
        "date": "2015-12-27",
        "value": 50
    }, {
        "date": "2015-12-28",
        "value": 50
    }, {
        "date": "2015-12-29",
        "value": 51
    }, {
        "date": "2015-12-30",
        "value": 52
    }, {
        "date": "2015-12-31",
        "value": 58
    }, {
        "date": "2016-01-01",
        "value": 60
    }, {
        "date": "2016-01-02",
        "value": 67
    }, {
        "date": "2016-01-03",
        "value": 64
    }, {
        "date": "2016-01-04",
        "value": 66
    }, {
        "date": "2016-01-05",
        "value": 60
    }, {
        "date": "2016-01-06",
        "value": 63
    }, {
        "date": "2016-01-07",
        "value": 61
    }, {
        "date": "2016-01-08",
        "value": 60
    }, {
        "date": "2016-01-09",
        "value": 65
    }, {
        "date": "2016-01-10",
        "value": 75
    }, {
        "date": "2016-01-11",
        "value": 77
    }, {
        "date": "2016-01-12",
        "value": 78
    }, {
        "date": "2016-01-13",
        "value": 70
    }, {
        "date": "2016-01-14",
        "value": 70
    }, {
        "date": "2016-01-15",
        "value": 73
    }, {
        "date": "2016-01-16",
        "value": 71
    }, {
        "date": "2016-01-17",
        "value": 74
    }, {
        "date": "2016-01-18",
        "value": 78
    }, {
        "date": "2016-01-19",
        "value": 85
    }, {
        "date": "2016-01-20",
        "value": 82
    }, {
        "date": "2016-01-21",
        "value": 83
    }, {
        "date": "2016-01-22",
        "value": 88
    }, {
        "date": "2016-01-23",
        "value": 85
    }, {
        "date": "2016-01-24",
        "value": 85
    }, {
        "date": "2016-01-25",
        "value": 80
    }, {
        "date": "2016-01-26",
        "value": 87
    }, {
        "date": "2016-01-27",
        "value": 84
    }, {
        "date": "2016-01-28",
        "value": 83
    }, {
        "date": "2016-01-29",
        "value": 84
    }, {
        "date": "2016-01-30",
        "value": 81
    }, {
        "date": "2016-02-01",
        "value": 62
    }];

    data = data.map(function(element){
      element.baseline = element.value * (Math.floor(Math.random() * 31) + 85) / 100;
      return element;
    });

    var chart = AmCharts.makeChart("mytrend", {
        "type": "serial",
        "theme": "light",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "mouseWheelZoomEnabled":true,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id": "v1",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth":true
        }],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [{
            "id": "g1",
            "balloon":{
              "drop":true,
              "adjustBorderColor":false,
              "color":"#ffffff"
            },
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>",
            "type": "smoothedLine"
        },{
          "id": "g2",
          "lineThickness": 2,
          "title": "red line",
          "useLineColorForBulletBorder": true,
          "valueField": "baseline",
          "balloonText": "<span style='font-size:18px;'>[[value]]</span>",
          "type": "smoothedLine"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "oppositeAxis":false,
            "offset":30,
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount":true,
            "color":"#AAAAAA"
        },
        "chartCursor": {
            "pan": true,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha":1,
            "cursorColor":"#258cbb",
            "limitToGraph":"g1",
            "valueLineAlpha":0.2
        },
        /*
        "valueScrollbar":{
          "oppositeAxis":false,
          "offset":50,
          "scrollbarHeight":10
        },
        */
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "export": {
            "enabled": true
        },
        "dataProvider": data
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();
    function zoomChart() {
        chart.zoomToIndexes(chart.dataProvider.length - 40, chart.dataProvider.length - 1);
    }
  },

  loadMyEsg: function(){
    var chart = AmCharts.makeChart("esg", {
    	"type": "serial",
      "theme": "light",
    	"categoryField": "type",
    	"rotate": true,
    	"startDuration": 1,
    	"categoryAxis": {
    		"gridPosition": "start",
    		"position": "left"
    	},
    	"trendLines": [],
    	"graphs": [
    		{
    			"balloonText": "My Ranking: [[value]]",
    			"fillAlphas": 0.8,
    			"id": "AmGraph-1",
    			"lineAlpha": 0.2,
    			"title": "Ranking",
    			"type": "column",
    			"valueField": "ranking",
    		},
    		{
    			"balloonText": "Industry Avg: [[value]]",
    			"fillAlphas": 0.8,
    			"id": "AmGraph-2",
    			"lineAlpha": 0.2,
    			"title": "Industry Avg",
    			"type": "column",
    			"valueField": "avg"
    		}
    	],
    	"guides": [],
    	"valueAxes": [
    		{
    			"id": "ValueAxis-1",
    			"position": "top",
    			"axisAlpha": 0
    		}
    	],
    	"allLabels": [],
    	"balloon": {},
    	"titles": [],
    	"dataProvider": [
    		{
    			"type": "Environmental",
    			"ranking": 23.5,
    			"avg": 18.1,
          "color": "#67b7dc"
    		},
    		{
    			"type": "Social",
    			"ranking": 26.2,
    			"avg": 22.8,
          "color": "#FF0000"
    		},
    		{
    			"type": "Governance",
    			"ranking": 29.5,
    			"avg": 25.1
    		}
    	],
        "export": {
        	"enabled": true
         }

    });
  },

  loadCompetitors: function(){
    var chart = AmCharts.makeChart( "competitors", {
      "type": "serial",
      "theme": "light",
      "dataProvider": [ {
        "country": "Curb",
        "visits": 43
      }, {
        "country": "Didi Kuaidi",
        "visits": 81
      }, {
        "country": "Grab",
        "visits": 75
      }, {
        "country": "Lyft",
        "visits": 66
      }, {
        "country": "Ola",
        "visits": 47
      }, {
        "country": "Taxi Magic",
        "visits": 58
      } ],
      "valueAxes": [ {
        "gridColor": "#EEEEEE",
        "gridAlpha": 0.2,
        "dashLength": 0,
        "labelsEnabled": true
      } ],
      "gridAboveGraphs": true,
      "startDuration": 1,
      "graphs": [ {
        "balloonText": "[[category]]: <b>[[value]]</b>",
        "fillAlphas": 0.8,
        "lineAlpha": 0.2,
        "type": "column",
        "valueField": "visits"
      } ],
      "chartCursor": {
        "categoryBalloonEnabled": false,
        "cursorAlpha": 0,
        "zoomable": false
      },
      "categoryField": "country",
      "categoryAxis": {
        "gridPosition": "start",
        "gridAlpha": 0,
        "tickPosition": "start",
        "tickLength": 20
      },
      "export": {
        "enabled": true
      },
      "data_labels_always_on": true
    } );

    $('#rrrChart').css('display', 'block');
    $('#rrrThreads').css('display', 'none');
    $('#rrrDaily').css('display', 'none');
  },

  loadCompDaily: function(){

    var start = [46, 11, 55, 62, 37, 48];
    var data = [];
    for( var x=15; x<=30; x++ ){
      data.push({
        "date": "2016-03-"+x,
        "market1": start[0]*(Math.floor(Math.random() * 31) + 85) / 100,
        "market2": start[1]*(Math.floor(Math.random() * 31) + 85) / 100,
        "market3": start[2]*(Math.floor(Math.random() * 31) + 85) / 100,
        "market4": start[3]*(Math.floor(Math.random() * 31) + 85) / 100,
        "market5": start[4]*(Math.floor(Math.random() * 31) + 85) / 100,
        "market6": start[5]*(Math.floor(Math.random() * 31) + 85) / 100,
      });
    }




/*    var chart = AmCharts.makeChart( "chartdiv", {
      "type": "serial",
      "addClassNames": true,
      "theme": "light",
      "autoMargins": false,
      "marginLeft": 30,
      "marginRight": 8,
      "marginTop": 10,
      "marginBottom": 26,
      "balloon": {
        "adjustBorderColor": false,
        "horizontalPadding": 10,
        "verticalPadding": 8,
        "color": "#ffffff"
      },

      "dataProvider": [ {
        "year": 2009,
        "income": 23.5,
        "expenses": 21.1
      }, {
        "year": 2010,
        "income": 26.2,
        "expenses": 30.5
      }, {
        "year": 2011,
        "income": 30.1,
        "expenses": 34.9
      }, {
        "year": 2012,
        "income": 29.5,
        "expenses": 31.1
      }, {
        "year": 2013,
        "income": 30.6,
        "expenses": 28.2,
        "dashLengthLine": 5
      }, {
        "year": 2014,
        "income": 34.1,
        "expenses": 32.9,
        "dashLengthColumn": 5,
        "alpha": 0.2,
        "additional": "(projection)"
      } ],
      "valueAxes": [ {
        "axisAlpha": 0,
        "position": "left"
      } ],
      "startDuration": 1,
      "graphs": [ {
        "alphaField": "alpha",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "fillAlphas": 1,
        "title": "Income",
        "type": "column",
        "valueField": "income",
        "dashLengthField": "dashLengthColumn"
      }, {
        "id": "graph2",
        "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
        "bullet": "round",
        "lineThickness": 3,
        "bulletSize": 7,
        "bulletBorderAlpha": 1,
        "bulletColor": "#FFFFFF",
        "useLineColorForBulletBorder": true,
        "bulletBorderThickness": 3,
        "fillAlphas": 0,
        "lineAlpha": 1,
        "title": "Expenses",
        "valueField": "expenses",
        "dashLengthField": "dashLengthLine"
      } ],
      "categoryField": "year",
      "categoryAxis": {
        "gridPosition": "start",
        "axisAlpha": 0,
        "tickLength": 0
      },
      "export": {
        "enabled": true
      }
    } );

    */

    var chart = AmCharts.makeChart("compDaily", {
      "type": "serial",
      "theme": "light",
      "dataDateFormat": "YYYY-MM-DD",
      "precision": 2,
      "graphs": [{
        "id": "g1",
        "valueAxis": "v2",
        "type": "smoothedLine",
        "title": "Curb",
        "valueField": "market1",
        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
      }, {
        "id": "g2",
        "valueAxis": "v2",
        "type": "smoothedLine",
        "title": "Didi Kuaidi",
        "valueField": "market2",
        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
      }, {
        "id": "g2",
        "valueAxis": "v2",
        "type": "smoothedLine",
        "title": "Grab",
        "valueField": "market3",
        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
      }, {
        "id": "g3",
        "valueAxis": "v2",
        "type": "smoothedLine",
        "title": "Lyft",
        "valueField": "market4",
        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
      }, {
        "id": "g4",
        "valueAxis": "v2",
        "type": "smoothedLine",
        "title": "Ola",
        "valueField": "market5",
        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
      }, {
        "id": "g5",
        "valueAxis": "v2",
        "type": "smoothedLine",
        "title": "Taxi Magic",
        "valueField": "market6",
        "balloonText": "[[title]]<br/><b style='font-size: 130%'>[[value]]</b>"
      }],
      "categoryField": "date",
      "categoryAxis": {
        "parseDates": true,
        "dashLength": 1,
        "minorGridEnabled": true
      },
      "legend": {
        "useGraphSettings": true,
        "position": "bottom"
      },
      "balloon": {
        "borderThickness": 1,
        "shadowAlpha": 0
      },
      "export": {
       "enabled": true
      },
      "dataProvider": data
      /*[{
        "date": "2013-01-16",
        "market1": 71,
        "market2": 75,
        "market3": 35,
        "market4": 84,
        "market5": 23,
        "market6": 66,
      }, {
        "date": "2013-01-17",
        "market1": 74,
        "market2": 78,
        "market3": 41,
        "market4": 62,
        "market5": 73,
        "market6": 63,
      }, {
        "date": "2013-01-18",
        "market1": 78,
        "market2": 88,
        "market3": 55,
        "market4": 72,
        "market5": 38,
        "market6": 61,
      }, {
        "date": "2013-01-19",
        "market1": 85,
        "market2": 89,
        "market3": 48,
        "market4": 59,
        "market5": 83,
        "market6": 76,
      }, {
        "date": "2013-01-20",
        "market1": 82,
        "market2": 89,
        "market3": 39,
        "market4": 69,
        "market5": 53,
        "market6": 46,
      }, {
        "date": "2013-01-21",
        "market1": 83,
        "market2": 85,
        "market3": 3,
        "market4": 5,
        "market5": 3,
        "market6": 6,
      }, {
        "date": "2013-01-22",
        "market1": 88,
        "market2": 92,
        "market3": 5,
        "market4": 7,
        "market5": 3,
        "market6": 6,
      }, {
        "date": "2013-01-23",
        "market1": 85,
        "market2": 90,
        "market3": 7,
        "market4": 6,
        "market5": 3,
        "market6": 6,
      }, {
        "date": "2013-01-24",
        "market1": 85,
        "market2": 91,
        "market3": 9,
        "market4": 5,
        "market5": 3,
        "market6": 6,
      }, {
        "date": "2013-01-25",
        "market1": 80,
        "market2": 84,
        "market3": 5,
        "market4": 8,
        "market5": 3,
        "market6": 6,
      }, {
        "date": "2013-01-26",
        "market1": 87,
        "market2": 92,
        "market3": 4,
        "market4": 8,
        "market5": 3,
        "market6": 6,
      }, {
        "date": "2013-01-27",
        "market1": 84,
        "market2": 87,
        "market3": 3,
        "market4": 4,
        "market5": 3,
        "market6": 6,
      }, {
        "date": "2013-01-28",
        "market1": 83,
        "market2": 88,
        "market3": 5,
        "market4": 7,
        "market5": 3,
        "market6": 6,
      }, {
        "date": "2013-01-29",
        "market1": 84,
        "market2": 87,
        "market3": 5,
        "market4": 8,
        "market5": 3,
        "market6": 6,
      }, {
        "date": "2013-01-30",
        "market1": 81,
        "market2": 85,
        "market3": 4,
        "market4": 7,
        "market5": 3,
        "market6": 6,
      }]
      */
    });

    $('#rrrChart').css('display', 'none');
    $('#rrrThreads').css('display', 'none');
    $('#rrrDaily').css('display', 'block');
  }
});

module.exports = View;
