module.exports = function(sequelize, DataTypes) {
  var Entry = sequelize.define("Entry", {
    id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    entry_id: { 
      type: DataTypes.STRING(200),
      allowNull: false,
      unique: true
    },
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
    longitude: DataTypes.STRING(200)
    }, 
    {
      tableName: 'entries',
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
    });

  return Entry;
};
