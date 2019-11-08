const usersRouter = require("express").Router();
const {
  fetchUserById,
  getAllUsers
} = require("../controllers/users-controller");
const { handle405s } = require("../errors/index");

usersRouter
  .route("/:username")
  .get(fetchUserById)
  .all(handle405s);

usersRouter
  .route("/")
  .get(getAllUsers)
  .all(handle405s);

module.exports = usersRouter;
