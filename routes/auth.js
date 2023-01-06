const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

//get route old methods
// authRouter.get("/auth/login", authController.login);
// authRouter.get("/auth/signup", authController.signup);
// authRouter.get("/auth/logout", authController.logout);

//instead of above we can do like this
authRouter
  .get("/auth/login", authController.getlogin)
  .post("/auth/login", authController.postlogin)
  .get("/auth/signup", authController.getsignup)
  .post("/auth/signup", authController.postsignup)
  .get("/auth/logout", authController.logout);
//post route
// authRouter.post('/auth/login',authController.);

module.exports = authRouter;
