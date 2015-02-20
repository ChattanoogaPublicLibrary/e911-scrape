var fs = require("fs")
  , _ = require("lodash")
  , path  = require("path")
  , Sequelize = require("sequelize")
  , basename = path.basename(module.filename)
  , env = require('../environment')
  , sequelize = new Sequelize(
      env.conf.database, 
      env.conf.username, 
      env.conf.password, 
      env.conf)
  , db = {};

fs
  .readdirSync(__dirname)
  .filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== basename);
  })
  .forEach(function(file) {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(function(modelName) {
  if ("associate" in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
