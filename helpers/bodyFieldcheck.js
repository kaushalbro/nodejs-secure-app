//check isEmpty
exports.isEmpty = (fields) => {
  var emptyfield = [];
  for (var i in fields) {
    if (typeof fields[i] === "string" && fields[i].trim().length === 0) {
      emptyfield.push(i + " is empty cannot proceed");
    }
  }
  if (emptyfield.length !== 0) {
    return emptyfield;
  } else {
    return false;
  }
};
