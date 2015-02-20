var env = process.env.NODE_ENV || "development"
  , config = require(__dirname + '/config/config.json')[env];

require('rconsole');

console.set({ facility: 'local0', title: 'e911-scrape' });

var configuration = config;

configuration.logging = function(msg){ return console.info(msg + ": %j", {source: 'sequelize'});};


exports.conf = configuration;
exports.logger = console;
