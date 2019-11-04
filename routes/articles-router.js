const articlesRouter = require("express").Router();
const {
  fetchArticleById,
  patchArticleById,
  fetchArticles
} = require("../controllers/articles-controller");
const { handle405s } = require("../errors/index");

const {
  sendComment,
  getCommentsById
} = require("../controllers/comments-controller");

articlesRouter
  .route("/")
  .get(fetchArticles)
  .all(handle405s);

articlesRouter
  .route("/:article_id")
  .get(fetchArticleById)
  .patch(patchArticleById)
  .all(handle405s);

articlesRouter
  .route("/:article_id/comments")
  .post(sendComment)
  .get(getCommentsById)
  .all(handle405s);

module.exports = articlesRouter;
