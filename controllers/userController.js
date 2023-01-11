const query = require("../db/sqlquery");
const bodyFieldcheck = require("../helpers/bodyFieldcheck");
const encrypt = require("../helpers/encrypt");

// /user
exports.getAlluser = (req, res) => {
  query
    .getall("users")
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json("can not get all users: " + error);
    });
};

exports.getUserById = (req, res) => {
  query
    .getbyOne("users", "user_id", req.params.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((error) => {
      res.status(404).json("can not get all users: " + error);
    });
};

//register new user
exports.registerUser = (req, res) => {
  //getting new user details
  const { username, email, password } = req.body;
  //checking if any supplie field in request is empty or not
  var fieldValue = bodyFieldcheck.check(req.body);
  //if all field has value
  if (fieldValue.length === 0) {
    //check if supplied username is in database or not
    query
      .isUser(username)
      .then((isUserExists) => {
        if (isUserExists) {
          //if user exists then send respond :already  user exists
          res
            .status(404)
            .json(
              "username already exists:: try again with another username.. "
            );
        } else {
          //if not usename in the database then only proceed
          encrypt
            .encode(password) // than encrypt password
            .then((hashedPassword) => {
              return hashedPassword; //return encrypted
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
    res.status(404).json(fieldValue);
  }
};
