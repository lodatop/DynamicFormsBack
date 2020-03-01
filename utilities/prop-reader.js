var propReader = require('properties-reader');

var properties = propReader('./utilities/queries.properties');

module.exports = properties;