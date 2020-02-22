var propReader = require('properties-reader');

var properties = propReader('./config/queries.properties');

module.exports = properties;