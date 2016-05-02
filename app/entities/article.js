'use strict';

var Backbone = require('backbone'),
  Bus = require('../core/bus'),
  Config = require('../core/config');


/********** MODEL **********/
var Article = Backbone.Model.extend({
  urlRoot: Config.baseUrl + "articles",

  url: function() {
    return this.urlRoot + "/" + this.id;
  }
});


/********** COLLECTION **********/
var ArticleCollection = Backbone.Collection.extend({
  url: Config.baseUrl + "articles",
  model: Article,
  parse: function(response, options) {
    return response.data;
  }
});


/********** CONTROLLER **********/
var API = {
  getArticleEntities: function(options) {
    var articles = new ArticleCollection();
    var defer = $.Deferred();
    articles.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      }
    }));
    return defer.promise();
  },

  getArticleEntity: function(fundId, options) {
    var article = new Article({
      id: articleId
    });
    var defer = $.Deferred();
    article.fetch($.extend({}, options, {
      success: function(data) {
        defer.resolve(data);
      },
      error: function(data) {
        defer.resolve(undefined);
      }
    }));
    return defer.promise();
  }
};


/********** EVENTS **********/
Bus.reqres.setHandler("article:entities", function(options) {
  return API.getArticleEntities(options);
});

Bus.reqres.setHandler("article:entity", function(id, options) {
  return API.getArticleEntity(id, options);
});


/********** EXPORTS **********/
module.exports = {
  Article: Article,
  ArticleCollection: ArticleCollection
};
