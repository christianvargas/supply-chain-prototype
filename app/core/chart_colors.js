'use strict';

module.exports = {
  label: '#FFFFFF',
  axis: '#9ea1a7',
  sectorBaseline: '#F02C87',
  countryBaseline: '#29ABE2',
  reputational: '#00FFFF',
  fill: '#F5F5F5',
  totalRisk: '#FF0000',
  green: '#50C150',
  red: '#F54C4C',
  preparedness: '#D89B34',
  environmental: '#7CC94C',
  social: '#FD9231',
  governance: '#33ACE0',

  exposure: ['#75E246', '#FECC4F', '#FE774F'],

  industryBaseline: {
    hex: '#9DA1A6',
    rgb: '157,161,166'
  },
  adjustedBaseline: {
    hex: '#FF931E',
    rgb: '255,147,30'
  },
  incidents: {
    hex: '#F15A24',
    rgb: '241,90,36'
  },
  management: {
    hex: '#00A99D',
    rgb: '0,169,157'
  },

  industryTreemap: ['#944859', '#9C5E51', '#9C7652', '#9C8754', '#9C9855', '#8E9B54', '#5A924F', '#1EA1A6', '#317699', '#414C93', '#624793', '#8B478A'],

  returnRgba: function(color, opacity) {
    return 'rgba(' + color + ', ' + opacity + ')';
  },

  returnRgbaByValue: function(color, value) {
    var opacity = (value < 3 ? 0.33 : (value < 6 ? 0.66 : 1));
    return this.returnRgba(color, opacity);
  },

  returnExposureByValue: function(value) {
    var index = (value < 3 ? 0 : (value < 6 ? 1 : 2));
    return this.exposure[index];
  },

  returnByRiskPremium: function(value) {
    return parseFloat(value) < 0 ? this.green : this.red;
  }
}
