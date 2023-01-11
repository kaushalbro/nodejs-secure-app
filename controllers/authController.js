// for signup, login and logout
const query = require("../db/sqlquery");
const bodyFieldcheck = require("../helpers/bodyFieldcheck");

exports.getsignup = (req, res) => {
  res.render("./signup");
};

exports.getlogin = (req, res) => {};

exports.postlogin = (req, res) => {
  const { username, password } = req.body;
  var fieldValue = bodyFieldcheck.check(req.body);
  if (fieldValue.length === 0) {
    query
      .verifyUserNamePassword(username, password)
      .then(() => {
        res
          .status(201)
          .json(
            "user credential valid: " + username + " logined in successfully"
          );
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  } else {
    res.status(404).json(checkEmptyField);
  }
};
exports.logout = (req, res) => {
  res.send("logout");
};

//how to do user validation using promise?
