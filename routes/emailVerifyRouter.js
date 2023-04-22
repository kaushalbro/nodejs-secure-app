const express = require("express");
const verificationRouter = express.Router();
const emailVerificationController = require("../controllers/emailVerificationController");

verificationRouter.get(
  "/:token",
  emailVerificationController.getVeificationLink
);

module.exports = verificationRouter;
