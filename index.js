try {
  var Spooky = require('spooky');
} catch (e) {
  var Spooky = require('../lib/spooky');
}


var logger = require('./logger')
  , config = require('./config.json')
  , db = require('./persist');

var spooky = new Spooky({
  child: {
    transport: 'http'
  },
  casper: {
    logLevel: 'debug',
    verbose: true,
    clientScripts: ['injections/e911-record.js']
  }},
  function (err) {
    if (err) {
      e = new Error('Failed to initialize SpookyJS');
      e.details = err;
      logger.error(e.details, {source: "spookyjs"})
      throw e;
    }

    spooky.start(config.sourceURL);
    spooky.then(function() {
      this.emit('processed-data', this.evaluate(function() {
        return getAllRecords();
      }));

    });

    spooky.then(function() {
      this.exit();
    });

    spooky.run();
});

spooky.on('error', function (e, stack) {
  logger.error(e, {source: "spookyjs"});

  if (stack) {
    logger.error(stack, {source: "spookyjs"});
  }
});

spooky.on('processed-data', function(dta) {
  db.persist(dta).then(function(f){
    logger.info("Done.", {source: "spookyjs"});
    spooky.destroy();
  });
});
