'use strict';

var Marionette = require('backbone.marionette'),
  Backbone = require('backbone'),
  Validation = require('backbone-validation'),
  _ = require('underscore'),
  Bus = require('./core/bus');

/***** VALIDATION CONFIG *****/
_.extend(Backbone.Validation.callbacks, {
    valid: function (view, attr, selector) {
        var $el = view.$('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

        $group.removeClass('has-error');
        $group.find('.help-block').html('').addClass('hidden');
    },
    invalid: function (view, attr, error, selector) {
        var $el = view.$('[name=' + attr + ']'),
            $group = $el.closest('.form-group');

        $group.addClass('has-error');
        $group.find('.help-block').html(error).removeClass('hidden');
    }
});


/***** APPLICATION SETUP *****/
var App = new Marionette.Application({
  initialize: function() {
    var RegionContainer = Marionette.LayoutView.extend({
      el: "#app-container",

      regions: {
        main: "#main-region",
        header: "#header-region",
        footer: "#footer-region",
        sidebar: "#sidebar-region",
        modal: "#modal-region"
      }
    });

    this.regions = new RegionContainer();

    this.regions.modal.onShow = function(view) {
      this.listenTo(view, 'modal:close', this.closeModal);

      /* set max height */
      $(this.$el).on("show.bs.modal", function() {
        var height = $(window).height() - 200;
        $(this).find(".modal-body").css("max-height", height);
      });

      $(this.$el).modal({
        backdrop: 'static',
        keyboard: true,
        show: true,
        static: true
      });
    };

    var closeModal = function() {
      self.stopListening();
      self.close();
      $(this.$el).modal('hide');
    }
  }
});
App.navigate = function(route, options) {
  options || (options = {trigger:true});
  Backbone.history.navigate(route, options);
};
App.getCurrentRoute = function() {
  return Backbone.history.fragment;
}


/********** APPLICATION START **********/
App.on("start", function() {
  // history
  if (Backbone.history) {
      // load header/sidebar
      Bus.commands.execute("header:show");
      Bus.commands.execute("sidebar:show");

      // start history
      Backbone.history.start();

      // redirect home
      if (App.getCurrentRoute() === "") {
        Bus.commands.execute("exposure:show:portfolio");
      }
  }
});

Bus.reqres.setHandler('main_region', function() {
  return App.regions.main;
});
Bus.reqres.setHandler('header_region', function() {
  return App.regions.header;
});
Bus.reqres.setHandler('sidebar_region', function() {
  return App.regions.sidebar;
});
Bus.commands.setHandler('redirect:home', function() {
  Bus.commands.execute("exposure:show:portfolio");
});

/********** EXPORTS **********/
module.exports = App;
