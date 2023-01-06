const sqlquery = require("../db/sqlquery");

// /user
exports.getAlluser = (req, res) => {
  // sqlquery.getall("users", (result) => {
  //   res.send(result);
  // });
  sqlquery.getall("users").then((result) => {
    res.send(result);
  });
};

exports.getUserById = (req, res) => {
  sqlquery.getOne("users", "user_id", req.params.id, (result) => {
    res.send(result);
  });
};
exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  res.send("user registered: " + username + " " + password);
};
