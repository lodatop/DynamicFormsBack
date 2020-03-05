var propReader = require('properties-reader');

var properties = propReader('./helpers/queries.properties');

module.exports = properties;