var env = require('./environment')
  , Promise = require('bluebird')
  , models = require("./models");

function persist(rows) {

  return Promise.each(rows, function(f) {
    var entry = {
      created: f.created,
      agency: f.agency,
      type: f.type,
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
