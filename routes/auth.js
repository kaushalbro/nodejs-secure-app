const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");

authRouter
  .get("/login", authController.getlogin)
  .post("/login", authController.postlogin)
  .get("/signup", authController.getsignup)
  .post("/signup", authController.signup)
  .get("/logout", authController.logout);

module.exports = authRouter;
