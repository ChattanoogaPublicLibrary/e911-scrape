var env = process.env.NODE_ENV || "development"
  , logger = require('winston')
  , config = require(__dirname + '/config/config.json')[env];

var configuration = config; 

configuration.logging = function(msg){ return logger.info(msg, {source: 'sequelize'});}; 

logger.setLevels({
    debug: 0,
    info: 1,
    silly: 2,
    warn: 3,
    error: 4,
});
logger.addColors({
    debug: 'green',
    info:  'cyan',
    silly: 'magenta',
    warn:  'yellow',
    error: 'red'
});

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, { level: 'debug', colorize: true });
logger.add(logger.transports.File, { filename: configuration.logLocation });

exports.conf = configuration;
exports.logger = logger;
