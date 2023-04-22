const express = require("express");
const subscriberRouter = express.Router();
const subsController = require("../controllers/subscriberController");

subscriberRouter
  .get("/", subsController.getSubscriber)
  .post("/", subsController.create)
  .patch("/:id", subsController.update)
  .delete("/:id", subsController.delete);

module.exports = subscriberRouter;
