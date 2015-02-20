"use strict";

module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable(
      'entries',
      {
        id: { 
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        entry_id: { 
          type: DataTypes.STRING(200),
          allowNull: false,
          unique: true},
        created: { 
          type: DataTypes.STRING(200),
          allowNull: false
        },
        agency: { 
          type: DataTypes.STRING(200),
          allowNull: false
        },
        location: { 
          type: DataTypes.STRING(200),
          allowNull: false
        },
        latitude: DataTypes.STRING(200),
        longitude: DataTypes.STRING(200),
        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
        deleted_at: DataTypes.DATE
      }, 
      {});
    done();
  },

  down: function(migration, DataTypes, done) {
    migration.dropTable('entries')
    done();
  }
};
