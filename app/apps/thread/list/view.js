'use strict';

var Marionette = require('backbone.marionette');

// item
var View = Marionette.ItemView.extend({
  template: require('./templates/view.hbs'),

  templateHelpers: function(){
    return {
      data: this.options.data,
      company: this.options.data.company,
    }
  },
});

module.exports = View;
