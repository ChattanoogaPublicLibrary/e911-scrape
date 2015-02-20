try {
  var Spooky = require('spooky');
} catch (e) {
  var Spooky = require('../lib/spooky');
}


var env = require('./environment')
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
      env.logger.error(e.details);
      throw e;
    }

    spooky.start(env.conf.sourceURL);
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
  env.logger.error(e);

  if (stack) {
    env.logger.error(stack);
  }
});

spooky.on('processed-data', function(dta) {
  db.persist(dta).then(function(f){
    env.logger.info("Done.");
    spooky.destroy();
  });
});
