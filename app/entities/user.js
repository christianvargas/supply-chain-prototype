'use strict';

var Backbone = require('backbone'),
  Bus = require('../core/bus'),
  Config = require('../core/config'),
  profile = null;


/********** MODEL **********/
var User = Backbone.Model.extend({
  urlRoot: Config.baseUrl + "users",
  url: function() {
    return this.urlRoot + "/" + this.id;
  },
  parse: function(response, options) {
    this.user_type = response.data.user_type;
    return response.data;
  },
  validate: function(attrs, options) {
    var errors = {}
  }
});

var RegisterUser = Backbone.Model.extend({
  initialize: function(attributes, options) {
    this.email = options.email;
  },
  urlRoot: Config.baseUrl + "register",
  url: function() {
    return this.urlRoot + "/" + this.email;
  },
  parse: function(response, options) {
    return response.data;
  }
});


/********** COLLECTION **********/
var UserCollection = Backbone.Collection.extend({
  url: Config.baseUrl + "users",
  model: User,
  parse: function(response, options) {
    return response.data;
  }
});


/********** USER PROFILE **********/
var Profile = User.extend({
  url: function() {
    return Config.baseUrl + "me"
  },

  isAccount: function() {
    return this.user_type === 'account';
  },

  isCompany: function() {
    return this.user_type === 'company';
  }
});


/********** CONTROLLER **********/
var API = {
  getUserEntities: function(options) {
    var users = new UserCollection();
    var defer = $.Deferred();
    users.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      }
    }));
    var promise = defer.promise();
    $.when(promise).done(function(fetchedUsers) {
      if (fetchedUsers.length === 0) {
        // no contacts found - initialize above
        var models = initializeUsers();
        users.reset(models);
      }
    });
    return promise;
  },

  getUserEntity: function(userId, options) {
    var user = new User({
      id: userId
    });
    var defer = $.Deferred();
    user.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      },
      error: function(data) {
        defer.resolve(undefined);
      }
    }));
    return defer.promise();
  },

  getUserProfileEntity: function(options) {
    if (profile === null) {
      var user = new Profile();
      var defer = $.Deferred();
      user.fetch($.extend({}, options, {
        success: function(data) {
          defer.resolve(data);
        },
        error: function(data) {
          defer.resolve(undefined);
        }
      }));
      profile = defer.promise();
    }

    return profile;
  },

  getRegisterUserEntity: function(email) {
    var user = new RegisterUser([], {
      email: email
    });
    var defer = $.Deferred();
    var self = this;
    user.fetch({
      success: function(data) {
        defer.resolve(data);
      },
      error: function(data) {
        defer.resolve(undefined);
      }
    });
    return defer.promise();
  }
};


/********** EVENTS **********/
Bus.reqres.setHandler("user:entities", function(options) {
  return API.getUserEntities(options);
});

Bus.reqres.setHandler("user:entity", function(id, options) {
  return API.getUserEntity(id, options);
});

Bus.reqres.setHandler("user:entity:new", function() {
  return new User();
});

Bus.reqres.setHandler("user:profile:entity", function(options) {
  return API.getUserProfileEntity(options);
});

Bus.commands.setHandler("user:profile:entity:reset", function() {
  profile = null;
});

Bus.reqres.setHandler("user:register:entity", function(email) {
  return API.getRegisterUserEntity(email);
});


/********** EXPORTS **********/
module.exports = {
  User: User,
  UserCollection: UserCollection,
  Profile: Profile
}
