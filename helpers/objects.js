var Handlebars = require('hbsfy/runtime');

// Iterate over an object containing other objects. Each
// inner object will be used in turn, with an added key ("myKey")
// set to the value of the inner object's key in the container.
Handlebars.registerHelper("each_with_key", function(obj, options) {
  var key = options.hash.key;
  return Handlebars.helpers.each(obj[key], options);
});

Handlebars.registerHelper("exists_with_key", function(obj, key, prop, options) {
  if (typeof obj === 'string' ){
    obj = JSON.parse(obj);
  }

  if (typeof obj !== 'object') {
      throw new Error('get: Cannot get from ' + typeof obj);
  }

  if (typeof prop !== 'string') {
      throw new Error('get: Property must be a string. Type ' + typeof prop + ' not supported');
  }

  if (obj===undefined || obj===null) {
      return false;
  }

  return Handlebars.helpers.exists(obj[key], prop, options);
});

Handlebars.registerHelper("valueByProperty", function(obj, prop){
  if (typeof obj === 'string' ){
    obj = JSON.parse(obj);
  }

  if (typeof obj !== 'object') {
      throw new Error('get: Cannot get from ' + typeof obj);
  }

  if (typeof prop !== 'string') {
      throw new Error('get: Property must be a string. Type ' + typeof prop + ' not supported');
  }

  if (obj===undefined || obj===null) {
      return false;
  }

  return obj[prop];
});

Handlebars.registerHelper("findByKeyValue", function(myArray, key, value, options){
  var result = $.grep(myArray, function(e){ return e[key] === value; });
  if( result.length == 1 ){
    return result[0];
  }

  return null;
});

module.exports = Handlebars;
