const commentsRouter = require("express").Router();
const {
  patchCommentById,
  deleteCommentById
} = require("../controllers/comments-controller");
const { handle405s } = require("../errors/index");

commentsRouter
  .route("/:comment_id")
  .patch(patchCommentById)
  .delete(deleteCommentById)
  .all(handle405s);

module.exports = commentsRouter;
