"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.addColumn(
      'entries',
      'incident_type',
      DataTypes.STRING(200)
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('entries', 'incident_type');
    done();
  }
};
