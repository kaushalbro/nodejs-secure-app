const express = require("express");
const adminViewController = express.Router();
const { isLevel_0 } = require("../middlewares/userRole");
const { verifyAccessToken } = require("../middlewares/auth");

adminViewController.get("/", verifyAccessToken, isLevel_0, (req, res) => {
  // res.render("./home");
});
function getAdmin() {}

module.exports = adminViewController;
