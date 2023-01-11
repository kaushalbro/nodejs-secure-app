// for signup, login and logout
const { json } = require("express");
const { sql } = require("../configs/dotenv_config");
const query = require("../db/sqlquery");
const bodyFieldcheck = require("../helpers/bodyFieldcheck");
const encrypt = require("../helpers/encrypt");

exports.getsignup = (req, res) => {
  res.render("./signup");
};

exports.postsignup = (req, res) => {
  const { username, email, password } = req.body;
  var fieldValue = bodyFieldcheck.check(req.body);
  if (fieldValue.length === 0) {
    query
      .isUser(username)
      .then((isUserExists) => {
        if (isUserExists) {
          res
            .status(404)
            .json(
              "username already exists:: try again with another username.. "
            );
        } else {
          encrypt
            .encode(password)
            .then((hashedPassword) => {
              return hashedPassword;
            })
            .then((hashedPassword) => {
              return query.insertIntoTable(
                "users",
                "user_name",
                "user_email",
                "password",
                username,
                email,
                hashedPassword
              );
            })
            .then((result) => {
              if (result.affectedRows == 1) {
                res
                  .status(201)
                  .json("user: " + username + " inserted successfully .... ");
              } else {
                res
                  .status(201)
                  .json("problem while signning up with user " + username);
              }
            })
            .catch((error) => {
              res.status(404).json(error);
            });
        }
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  } else {
    res.status(404).json(checkEmptyField);
  }
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
