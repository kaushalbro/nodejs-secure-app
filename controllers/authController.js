// for signup, login and logout
const { sql } = require("../configs/dotenv_config");
const query = require("../db/sqlquery");
const encrypt = require("../helpers/encrypt");

exports.getsignup = (req, res) => {
  res.render("./signup");
};

exports.postsignup = (req, res) => {
  const { username, email, password } = req.body;

  query
    .isUser(username)
    .then((result) => {
      if (result) {
        res
          .status(404)
          .json("already exists:: try again with another username.. ");
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
              "passwod",
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
};

exports.getlogin = (req, res) => {};

exports.postlogin = (req, res) => {
  const { username, password } = req.body;
  query
    .isUser(username)
    .then((result) => {})
    .catch((error) => {
      res.send(error);
    });
  // sqlquery.verifyUserNamePassword(username, password, (isVerified) => {
  //   if (isVerified) {
  //     res.status(201).json("valid user loggd in.....");
  //   } else {
  //     res
  //       .status(404)
  //       .json("unvalid: username or password doesn't matched.....");
  //   }
  // });
};

exports.logout = (req, res) => {
  res.send("logout");
};

//how to do user validation using promise?
