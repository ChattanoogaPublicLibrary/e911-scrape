var moment = require('moment-timezone')
  , _ = require("lodash")
  , fs = require("fs")
  , es = require('event-stream')
  , env = require('./environment')
  , csv = require('fast-csv')
  , models = require('./models');

function beginningOfYesterday() {
  return moment.tz(env.conf.dataTimezone).subtract(1, 'days').startOf('day').toDate()
}

function endOfYesterday() {
  return moment.tz(env.conf.dataTimezone).subtract(1, 'days').endOf('day').toDate()
}

function transformRow(r) {
  var hsh = r.dataValues;
  hsh.created = moment.tz(hsh.created, env.conf.dataTimezone).format();
  delete hsh['id'];
  delete hsh['deleted_at'];
  delete hsh['created_at'];
  delete hsh['updated_at'];
  return hsh;
}

models.Entry.findAll({
  where: {
    created: {
      $gte: beginningOfYesterday(),
      $lte: endOfYesterday()
    }
  }
}).then(function(r) {
  return es.readArray(r)
    .pipe(es.map(function(line, cb) {
      cb(null, transformRow(line));
    }))
    .pipe(csv.createWriteStream({headers: true}))
    .pipe(fs.createWriteStream("export/export.csv"));
  /*
  return csv.writeToStream(fs.createWriteStream("export/export.csv"), _.map(r, function(i) {return i.dataValues}), {headers: true});
*/
});
