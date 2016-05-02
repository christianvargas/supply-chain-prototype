'use strict';

var Marionette = require('backbone.marionette'),
    Handlebars = require('handlebars'),
    Bus = require('../../../core/bus');


// view
var View = Marionette.ItemView.extend({
  template: require('./templates/top_bar.hbs'),

  setActive: function(url) {
    this.$el.find('li').removeClass('active');
    this.$el.find('a[href$="' + url + '"]').closest('li').addClass('active');
  },

  onShow: function(){
    var source = new Bloodhound({
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: this.options.data.search
    });

    source.initialize();

    $('.form-group .typeahead').typeahead(null, {
      name: 'matched-links',
      displayKey: 'name',
      source: source.ttAdapter(),
      templates: {
        empty: require('./templates/search-empty.hbs'),
        footer: require('./templates/search-footer.hbs'),
        suggestion: require('./templates/search-results.hbs'),
      },
    }).bind('typeahead:select', function(ev, suggestion) {
      Bus.commands.execute("company:show");
    });
  }
});

module.exports = View;
