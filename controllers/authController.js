// for signup, login and logout
const sqlquery = require("../db/sqlquery");
const encrypt = require("../helpers/encrypt");

exports.getsignup = (req, res) => {
  res.render("./signup");
};

exports.postsignup = (req, res) => {
  const { username, email, password } = req.body;
  const passwordEncrypt = encrypt.encode(password);
  sqlquery.verifyUser(username, (userExits) => {
    if (!userExits) {
      sqlquery.insertIntoTable(
        "users",
        "user_name",
        "user_email",
        "password",
        username,
        email,
        passwordEncrypt
      );
      res.status(201).json("user Created: " + username);
      console.log("user Created: " + username);
    } else {
      res
        .status(404)
        .json(
          "user: " +
            username +
            " already exists:: try again with another username.. "
        );
      console.log(
        "user: " +
          username +
          " already exists:: try again with another username.. "
      );
    }
  });
};

exports.getlogin = (req, res) => {};

exports.postlogin = (req, res) => {
  const { username, password } = req.body;
  sqlquery.verifyUserNamePassword(username, password, (isVerified) => {
    if (isVerified) {
      res.status(201).json("valid user loggd in.....");
    } else {
      res.status(404).json("unvalid: username or password doesnt matched.....");
    }
  });
};

exports.logout = (req, res) => {
  res.send("logout");
};
