'use strict';

var Marionette = require('backbone.marionette');

var View = Marionette.ItemView.extend({
  template: require('./templates/account-menu.hbs'),

  templateHelpers: function(){
    return {
      watchlist: this.options.data.watchlist,
      saved: this.options.data.saved.sort()
    }
  },

  toggleMenu: function(e){
    e.preventDefault();
    var link = $(e.target).parents('li:first');

    if($(link).parent().hasClass("has_sub")) {
      e.preventDefault();
    }

    if( !$(link).hasClass("subdrop") ){
      // hide any open menus and remove all other classes
      $("ul",$(link).parents("ul:first")).slideUp(350);
      $("a",$(link).parents("ul:first")).removeClass("subdrop");

      // open our new menu and add the open class
      if( $(link).find('ul').length > 0 ){
        $(link).find("ul").slideDown(350);
        $(link).addClass("subdrop");
      }
    } else {
      $(link).removeClass("subdrop");
      $(link).find("ul").slideUp(350);
    }
  }
});

module.exports = View;
