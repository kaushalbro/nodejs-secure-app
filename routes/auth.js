const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/authController");
const { verifyAccessToken } = require("../middlewares/auth");

authRouter
  .post("/login", authController.postlogin)
  .post("/signup", authController.signup)
  .get("/logout", authController.logout);

module.exports = authRouter;
