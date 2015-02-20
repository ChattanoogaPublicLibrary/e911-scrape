"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.removeColumn('entries', 'created');
    migration.addColumn(
      'entries',
      'created',
      DataTypes.DATE
    );
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.removeColumn('entries', 'created');
    migration.addColumn(
      'entries',
      'created',
      DataTypes.STRING
    );
    done();
  }
};
