const topicsRouter = require("express").Router();
const { fetchAllTopics } = require("../controllers/topics-controller");
const { handle405s } = require("../errors/index");

topicsRouter
  .route("/")
  .get(fetchAllTopics)
  .all(handle405s);

module.exports = topicsRouter;
