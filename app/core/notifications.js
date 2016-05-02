'use strict';

var Notification = (function(){
  var defaultOptions = {
    style: 'metro',
    className: 'info',
    globalPosition: 'top right',
    autoHideDelay: 1500,
    showAnimation: "show",
    showDuration: 0,
    hideDuration: 200,
    autoHide: true,
    clickToHide: true
  };

  var getMessage = function(title, text, image){
    return {
      title: title,
      text: text,
      image: "<i class='"+image+"'></i>"
    };
  };

  return {
    info: function(title, text, options){
      var message = getMessage(title, text, 'ti-info');
      this.notify(message, options, 'info');
    },

    warning: function(title, text, options){
      var message = getMessage(title, text, 'ti-info-alt');
      this.notify(message, options, 'warning');
    },

    error: function(title, text, options){
      var message = getMessage(title, text, 'ti-alert');
      this.notify(message, options, 'error');
    },

    success: function(title, text, options){
      var message = getMessage(title, text, 'ti-check');
      this.notify(message, options, 'success');
    },

    default: function(title, text, options){
      var message = getMessage(title, text, 'ti-info');
      this.notify(message, options, 'default');
    },

    notify: function(message, options, className){
      options = $.extend({}, defaultOptions, options);
      options.className = className;
      $.notify(message, options);
    }
  }
})();


module.exports = Notification;
