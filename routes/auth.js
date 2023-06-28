const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const { verifyAccessToken } = require("../middlewares/auth");

authRouter
<<<<<<< HEAD
  .get("/login", authController.getlogin)
  .post("/login", authController.postlogin)
  .get("/signup", authController.getsignup)
=======
  .post("/login", authController.postlogin)
>>>>>>> d8823b6f3a29c279c492b7aaba34be9f0765266e
  .post("/signup", authController.signup)
  .get("/logout", authController.logout);

module.exports = authRouter;
