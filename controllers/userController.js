const sqlquery = require("../db/sqlquery");

// /user
exports.getAlluser = (req, res) => {
  sqlquery
    .getall("users")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json("can not get all users: " + error);
    });
};

exports.getUserById = (req, res) => {
  sqlquery
    .getOne("users", "user_id", req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json("can not get all users: " + error);
    });
};
exports.registerUser = (req, res) => {
  const { username, password } = req.body;
  res.send("user registered: " + username + " " + password);
};
