'use strict';

var Marionette = require('backbone.marionette');

// item
var View = Marionette.ItemView.extend({
  template: require('./templates/view.hbs'),

  templateHelpers: function(){
    return {
      data: this.options.data,
      thread: this.options.data.myNews[0],
    }
  },

  events: {
    'click a.show-articles': 'showArticles',
    'click a.show-issues': 'showIssues',
    'click a.show-details': 'showDetails',
    'click a.show-stories': 'showStories',
    "click a.show-detail": "showDetail",
  },

  onShow: function(){
    this.showArticles();
    $('#company-details').css('margin-top', $('#header-container').innerHeight() + parseFloat($('.navbar:first').outerHeight()));
  },

  showDetail: function(e){
    e.preventDefault();
    $('tr[data-detail-id="' + $(e.target).closest('a').data('id') + '"]').toggle();
  },

  showArticles: function(e){
    if( e !== undefined ){
      e.preventDefault();
    }

    this.hideAll();
    $('.show-articles').addClass('active');
    $('#articles').css('display', 'block');
  },

  showDetails: function(e){
    if( e !== undefined ){
      e.preventDefault();
    }

    this.hideAll();
    $('.show-details').addClass('active');
    $('#details').css('display', 'block');

    this.showBreakdown();
    this.showHeatmap();
  },

  hideAll: function(){
    $('.nav-links').removeClass('active');
    $('#articles').add('#issues').add('#details').add('#stories').css('display', 'none');
  },

  showBreakdown: function(){
    var chart = AmCharts.makeChart("breakdown", {
      "type": "pie",
      "startDuration": 0,
       "theme": "light",
      "addClassNames": true,
      /*
      "legend":{
       	"position":"bottom",
        "marginRight":50,
        "autoMargins":false
      },
      */
      "innerRadius": "60%",
      "defs": {
        "filter": [{
          "id": "shadow",
          "width": "200%",
          "height": "200%",
          "feOffset": {
            "result": "offOut",
            "in": "SourceAlpha",
            "dx": 0,
            "dy": 0
          },
          "feGaussianBlur": {
            "result": "blurOut",
            "in": "offOut",
            "stdDeviation": 5
          },
          "feBlend": {
            "in": "SourceGraphic",
            "in2": "blurOut",
            "mode": "normal"
          }
        }]
      },
      "dataProvider": [{
        "country": "Media Rank 1",
        "count": 50
      }, {
        "country": "Media Rank 2",
        "count": 31
      }, {
        "country": "Media Rank 3",
        "count": 20
      }, {
        "country": "Media Rank 4",
        "count": 48
      }, {
        "country": "Media Rank 5",
        "count": 9
      }],
      "valueField": "count",
      "titleField": "country",
      "export": {
        "enabled": true
      }
    });

    chart.addListener("init", handleInit);

    chart.addListener("rollOverSlice", function(e) {
      handleRollOver(e);
    });

    function handleInit(){
      chart.legend.addListener("rollOverItem", handleRollOver);
    }

    function handleRollOver(e){
      var wedge = e.dataItem.wedge.node;
      wedge.parentNode.appendChild(wedge);
    }
  },

  showHeatmap: function(){
    $.getJSON('https://www.highcharts.com/samples/data/jsonp.php?filename=world-population-density.json&callback=?', function (data) {

        // Add lower case codes to the data set for inclusion in the tooltip.pointFormat
        $.each(data, function () {
            this.flag = this.code.replace('UK', 'GB').toLowerCase();
        });

        // Initiate the chart
        $('#heatmap').highcharts('Map', {

            title: {
                text: null
            },

            legend: {
                title: {
                    text: 'Story Volume',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                    }
                }
            },

            exporting: {
              enabled: false
            },

            mapNavigation: {
                enabled: true,
                buttonOptions: {
                    verticalAlign: 'bottom'
                }
            },

            tooltip: {
                backgroundColor: 'none',
                borderWidth: 0,
                shadow: false,
                useHTML: true,
                padding: 0,
                pointFormat: '<span class="f32"><span class="flag {point.flag}"></span></span>' +
                    ' {point.name}: <b>{point.value}</b>',
                positioner: function () {
                    return { x: 0, y: 250 };
                }
            },

            colorAxis: {
                min: 1,
                max: 100,
                type: 'logarithmic'
            },

            series : [{
                data : data,
                mapData: Highcharts.maps['custom/world'],
                joinBy: ['iso-a2', 'code'],
                name: 'Stories',
                states: {
                    hover: {
                        color: '#BADA55'
                    }
                }
            }]
        });
    });
  }

});

module.exports = View;
