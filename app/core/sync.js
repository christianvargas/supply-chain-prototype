'use strict';

var Backbone = require('backbone'),
  Bus = require('./bus'),
  _ = require('underscore');

var methods, oldSync;
oldSync = Backbone.sync;
Backbone.sync = function(method, entity, options) {
  var _errorCallback, auth, errorCallback;
  if (options == null) {
    options = {};
  }
  _.defaults(options, {
    beforeSend: _.bind(methods.beforeSend, entity),
    complete: _.bind(methods.complete, entity)
  });
  auth = Bus.reqres.request('auth');
  options.headers = {
    Authorization: 'Bearer ' + auth.getAccessToken(),
    Application: 'application/json',
    'Content-Type': 'application/json'
  };
  errorCallback = function(jqXHR) {
    if (jqXHR.status === 401) {
      return Bus.events.trigger('sync:unauthorized');
    }
  };
  if (options.error != null) {
    _errorCallback = options.error;
    options.error = function(jqXHR, textStatus, errorThrown) {
      errorCallback(jqXHR);
      return _errorCallback(jqXHR, textStatus, errorThrown);
    };
  } else {
    options.error = function(jqXHR) {
      return errorCallback(jqXHR);
    };
  }
  return oldSync(method, entity, options);
};
return methods = {
  beforeSend: function() {
    return this.trigger("sync:start", this);
  },
  complete: function() {
    return this.trigger("sync:stop", this);
  }
};;

module.exports = Backbone;
