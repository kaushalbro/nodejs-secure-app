const express = require("express");
const userRouter = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/userRole");

userRouter
  .get("/", auth.verifyAccessToken, role.isLevel_0, userController.getAlluser)
  .get(
    "/:id",
    auth.verifyAccessToken,
    role.isLevel_0_1,
    userController.getUserById
  )
  .post("/", userController.create)
  .patch("/:id", userController.update)
  .delete(
    "/:id",
    auth.verifyAccessToken,
    role.isLevel_0,
    userController.deleteUser
  );

module.exports = userRouter;
