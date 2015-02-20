var env = process.env.NODE_ENV || "development"
  , config = require(__dirname + '/config/config.json')[env];

require('rconsole');

var configuration = config;

console.set({ facility: config.logFacility, title: 'e911-scrape' });

configuration.logging = function(msg){ return console.info(msg);};


exports.conf = configuration;
exports.logger = console;
