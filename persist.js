var env = require('./environment')
  , Promise = require('bluebird')
  , moment = require('moment-timezone')
  , models = require("./models");

function processCreatedTime(t) {
  return moment.tz(t, 'MM/DD/YYYY h:mma', env.conf.dataTimezone).toDate();
}

function persist(rows) {

  return Promise.each(rows, function(f) {
    var entry = {
      created: processCreatedTime(f.created),
      agency: f.agency,
      incident_type: f.type,
      location: f.location,
      latitude: f.latitude,
      longitude: f.longitude,
    };

    return models.Entry
      .findOrCreate({where: {entry_id: f._id}, defaults: entry})
      .spread(function(ent, created){
        if (created) {
          env.logger.info('Success');
        } else {
          env.logger.warn('Instance exists.');
        }

      })
      .catch(function(e) {
        env.logger.error(e);
      });

  });

}

exports.persist = persist;
