const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");

userRouter
  .get("/user", userController.getAlluser)
  .get("/user/:id", userController.getUserById)
  .post("/user", userController.registerUser);

module.exports = userRouter;
