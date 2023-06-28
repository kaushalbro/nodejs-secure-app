// for signup, login and logout
const bodyFieldcheck = require("../helpers/bodyFieldcheck");
const JWT = require("../configs/utils/JWT");
const User = require("../models/User");
<<<<<<< HEAD

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                    LOGIN SIGINUP GET                                                      @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.getsignup = (req, res) => {
  res.render("../views/pages/signup");
};

//GET METHOD LOGIN

exports.getlogin = (req, res) => {
  if (!req.cookies.access_token && !req.cookies.refresh_token) {
    return res.render("../views/login", { title: "Login page" });
  }
  return res.redirect("/admin");
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                      LOGIN POST                                                           @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.postlogin = async (req, res) => {
  try {
    const user = req.body;
    const { username, password } = user;
    if (username === undefined || password === undefined) {
      return res
        .status(400)
        .json("make username or password field's name are corrent");
    }
    const user_value = Object.values(user);
    if (user_value.length !== 2) {
      return res
        .status(400)
        .json(
          "Field length error:two parameters required : username and paword is required"
        );
    }
    //check emptyness in object
    var isEmpty = bodyFieldcheck.isEmpty(user);
    if (isEmpty) {
      return res.status(400).json(isEmpty);
    }
    const UserVerificationMessage = await User.verifyUserPassword(
      username,
      password
    );
    if (typeof UserVerificationMessage !== "object") {
      throw UserVerificationMessage;
      // return res.send(UserVerificationMessage);
    }
    //UserVerificationMessage returns user object
    const user_ = UserVerificationMessage;
    //creating a access token
    const access_token = await JWT.createAccessToken(user_);
    const referesh_token = await JWT.createRefereshToken(user_);
    // Creating refresh token not that expiry of refresh
    //token is greater than the access token
    // Assigning refresh token in http-only cookie
    res
      .cookie("refresh_token", referesh_token, {
        secure: true,
        path: "/",
        httpOnly: true,
        hostOnly: true,
        sameSite: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("access_token", "Bearer " + access_token, {
        secure: true,
        path: "/",
        httpOnly: true,
        hostOnly: true,
        sameSite: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
    return res.redirect("/admin");
    // return res.json({
    //   loggedIn: true,
    //   user: {
    //     user_id: user_.user_id,
    //     user_name: user_.user_name,
    //     user_email: user_.user_email,
    //     user_level: user_.user_level,
    //   },
    //   access_token: access_token,
    // });
  } catch (error) {
    // return res.render("../views/pages/login.ejs", { error });
    return res.status(400).json(error);
  }
};
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                     SIGNUP POST                                                           @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

=======

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                    LOGIN SIGINUP GET                                                      @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

//GET METHOD LOGIN

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                      LOGIN POST                                                           @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

exports.postlogin = async (req, res) => {
  try {
    const user = req.body;
    const { username, password } = user;
    if (username === undefined || password === undefined) {
      return res
        .status(400)
        .json("make username or password field's name are corrent");
    }
    const user_value = Object.values(user);
    if (user_value.length !== 2) {
      return res
        .status(400)
        .json(
          "Field length error:two parameters required : username and paword is required"
        );
    }
    //check emptyness in object
    var isEmpty = bodyFieldcheck.isEmpty(user);
    if (isEmpty) {
      return res.status(400).json(isEmpty);
    }
    const UserVerificationMessage = await User.verifyUserPassword(
      username,
      password
    );
    if (typeof UserVerificationMessage !== "object") {
      return res.send(UserVerificationMessage);
    }
    //UserVerificationMessage returns user object
    const user_ = UserVerificationMessage;
    //creating a access token
    const access_token = await JWT.createAccessToken(user_);
    const referesh_token = await JWT.createRefereshToken(user_);
    // Creating refresh token not that expiry of refresh
    //token is greater than the access token
    // Assigning refresh token in http-only cookie
    res
      .cookie("refresh_token", referesh_token, {
        secure: true,
        path: "/",
        httpOnly: true,
        hostOnly: true,
        sameSite: false,
        maxAge: 24 * 60 * 60 * 1000,
      })
      .cookie("access_token", "Bearer " + access_token, {
        secure: true,
        path: "/",
        httpOnly: true,
        hostOnly: true,
        sameSite: false,
        maxAge: 24 * 60 * 60 * 1000,
      });
    return res.redirect("/admin");
    // return res.json({
    //   loggedIn: true,
    //   user: {
    //     user_id: user_.user_id,
    //     user_name: user_.user_name,
    //     user_email: user_.user_email,
    //     user_level: user_.user_level,
    //   },
    //   access_token: access_token,
    // });
    // res.redirect("/admin");
  } catch (error) {
    return res.status(400).json(error);
  }
};

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
//@                                                                                                                           @
//@                                                                                                                           @
//@                                                     SIGNUP POST                                                           @
//@                                                                                                                           @
//@                                                                                                                           @
//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

>>>>>>> d8823b6f3a29c279c492b7aaba34be9f0765266e
exports.signup = async (req, res) => {
  //getting new user details
  var user = req.body;
  var user_value = Object.values(user);
  const is_empty = bodyFieldcheck.isEmpty(user);
  if (is_empty) {
    return res.status(400).json(is_empty);
  }
  try {
    const newUser = await User.create(user_value);
    if (newUser.affectedRows !== 1) {
      return res.status(409).json(newUser);
    }
    return res.status(201).json("User " + user_value[0] + " created::  ");
  } catch (error) {
    console.log(error);
    //problem like this can be occured so applied this way, Error: Duplicate entry 'hari1@gmail.com' for key 'users.user_email'
    return res.status(501).json(error);
  }
};
exports.logout = (req, res) => {
  res
    .cookie("refresh_token", "", {
      secure: true,
      path: "/",
      httpOnly: true,
      hostOnly: true,
      sameSite: false,
      maxAge: 1,
    })
    .cookie("access_token", "", {
      secure: true,
      path: "/",
      httpOnly: true,
      hostOnly: true,
      sameSite: false,
      maxAge: 1,
    });
<<<<<<< HEAD
  return res.redirect("/api/auth/login");
=======
  return res.status(200).json({ message: "logout sccessfully" });
>>>>>>> d8823b6f3a29c279c492b7aaba34be9f0765266e
};

//how to do user validation using promise
