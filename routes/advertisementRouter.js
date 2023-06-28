const express = require("express");
const adsRouter = express.Router();
const adsController = require("../controllers/advertisementController");
const { verifyAccessToken } = require("../middlewares/auth");
const { isLevel_0 } = require("../middlewares/userRole");
adsRouter
  .get("/", adsController.getAds)
  .post("/", adsController.create)
  .patch("/:id", adsController.update)
  .delete("/:id", verifyAccessToken, isLevel_0, adsController.delete);

module.exports = adsRouter;
