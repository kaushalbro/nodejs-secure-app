const express = require("express");
const refereshTokenRouter = express.Router();
const refereshTokenController = require("../controllers/refereshTokenController");

refereshTokenRouter.post("/", refereshTokenController.refereshToken);

module.exports = refereshTokenRouter;
