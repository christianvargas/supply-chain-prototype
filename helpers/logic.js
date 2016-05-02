var Handlebars = require('hbsfy/runtime');

/**
 * Sum
 * Returns the sum of n item.
 */
Handlebars.registerHelper('sum', function() {
  var sum = 0, v;
  for (var i=0; i<arguments.length; i++) {
    v = parseFloat(arguments[i]);
    if (!isNaN(v)) sum += v;
  }
  return parseInt(sum * 100) / 100;
});

Handlebars.registerHelper('round', function(sum, decimals) {
  return Math.round(sum, decimals);
});

Handlebars.registerHelper('min', function(num1, num2) {
  return Math.min(parseFloat(num1), parseFloat(num2));
});

Handlebars.registerHelper('max', function(num1, num2) {
  return Math.max(parseFloat(num1), parseFloat(num2));
});

Handlebars.registerHelper('absDiff', function(num1, num2) {
  return Math.abs(parseFloat(num1) - parseFloat(num2));
});

Handlebars.registerHelper('withSign', function(number) {
  return parseFloat(number) > 0 ? '+'+number : number;
});


Handlebars.registerHelper('get', function (obj, prop, context) {
    if (typeof obj !== 'object') {
        throw new Error('get: Cannot get from ' + typeof obj);
    }

    if (typeof prop !== 'string') {
        throw new Error('get: Property must be a string. Type ' + typeof prop + ' not supported');
    }

    if (!obj.hasOwnProperty(prop)) {
        throw new Error('get: Object does not contain the property "' + prop + '"');
    }

    return obj[prop];
});

Handlebars.registerHelper('exists', function (obj, prop, context) {
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

    if (!obj.hasOwnProperty(prop)) {
        return false;
    }

    return true;
});

Handlebars.registerHelper('not_exists', function (obj, prop, context) {
    return !(Handlebars.helpers.exists(obj, prop, context));
});

Handlebars.registerHelper("math", function(lvalue, operator, rvalue, options) {
    lvalue = parseFloat(lvalue);
    rvalue = parseFloat(rvalue);

    return {
        "+": lvalue + rvalue,
        "-": lvalue - rvalue,
        "*": lvalue * rvalue,
        "/": lvalue / rvalue,
        "%": lvalue % rvalue
    }[operator];
});

module.exports = Handlebars;
