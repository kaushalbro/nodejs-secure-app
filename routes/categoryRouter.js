const express = require("express");
const catRouter = express.Router();
const catController = require("../controllers/categoryController");
const auth = require("../middlewares/auth");
const role = require("../middlewares/userRole");
catRouter
  .get("/", catController.getCategory)
  .post("/", catController.create)
  .patch("/:id", auth.verifyAccessToken, role.isLevel_0, catController.update)
  .delete("/:id", auth.verifyAccessToken, role.isLevel_0, catController.delete);

module.exports = catRouter;
