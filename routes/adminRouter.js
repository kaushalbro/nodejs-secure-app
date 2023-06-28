const express = require("express");
const adminRouter = express.Router();
const adminViewController = require("../controllers/adminViewController");
const { verifyAccessToken } = require("../middlewares/auth");
const { isLevel_0 } = require("../middlewares/userRole");

adminRouter
  .get("/", verifyAccessToken, isLevel_0, adminViewController.dashboard)
  .get("/:page/:sub_page", adminViewController.page);

module.exports = adminRouter;
