var E911Record =  function(row, points) {
  var record = row.children;
  var cell0 = record[0].innerText.split('\n');
  var cell1 = record[1].innerText.split('\n');
  var cell2 = record[2].innerText.split('\n');

  this.id = cell0[0];
  this.created = cell0[1];
  this.status = cell0[2];
  this.agency = cell1[0];
  this.type = cell1[1];
  this.location = cell2[0];

  if (points[this.id] === undefined) {
    this.latitude = null;
  } else {

  this.latitude = points[this.id].data.latitude;

  }

  if (points[this.id] === undefined) {
    this.longitude = null;
  } else {

  this.longitude = points[this.id].data.longitude;

  }
}

E911Record.prototype.getID = function() {
  return this.id;
}

E911Record.prototype.getCreated = function() {
  return this.created;
}

E911Record.prototype.getAgency = function() {
  return this.agency;
}

E911Record.prototype.getType = function() {
  return this.type;
}

E911Record.prototype.getLocation = function() {
  return this.location;
}

E911Record.prototype.getLatitude = function() {
  return this.latitude;
}

E911Record.prototype.getLongitude = function() {
  return this.longitude;
}

function getAllRecords() {
  var records = document.querySelectorAll("#activities table tbody tr");

  return [].map.call(records, function(i) {

    var cells = new E911Record(i, markers);

    return {
      _id: cells.getID(),
      created: cells.getCreated(),
      agency: cells.getAgency(),
      type: cells.getType(),
      location: cells.getLocation(),
      latitude: cells.getLatitude(),
      longitude: cells.getLongitude()
    };
  });

}
