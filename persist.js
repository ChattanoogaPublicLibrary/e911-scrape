var logger = require('./logger')
  , config = require('./config.json')
  , Sequelize = require('sequelize')
  , Promise = require('bluebird')
  , sequelize = new Sequelize(config.postgresURI, {
      dialect: "postgres",
      logging: function(msg){ return logger.info(msg, {source: 'sequelize'})}
    });

var Entry = sequelize.define("Entry", {
  id: { type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  entry_id: { type: Sequelize.STRING(200),
    allowNull: false,
    unique: true},
  created: { type: Sequelize.STRING(200),
    allowNull: false},
  agency: { type: Sequelize.STRING(200),
    allowNull: false},
  location: { type: Sequelize.STRING(200),
    allowNull: false},
  latitude: Sequelize.STRING(200),
  longitude: Sequelize.STRING(200)
}, {tableName: 'entries',
  createdAt: 'created_at',
  updatedAt: 'updated_at',
  deletedAt: 'deleted_at',
  });

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

    return Entry
      .findOrCreate({where: {entry_id: f._id}, defaults: entry})
      .spread(function(ent, created){
        if (created) {
          logger.info('Success');
        } else {
          logger.warn('Instance exists.');
        }

      })
      .catch(function(e) {
        logger.error(e);
      });

  });

}

exports.persist = persist;
