exports.check = (obj) => {
  var emptyfield = [];
  for (var i in obj) {
    if (obj[i].trim().length === 0) {
      emptyfield.push(i + " is empty cannot proceed");
    }
  }
  return emptyfield;
};
