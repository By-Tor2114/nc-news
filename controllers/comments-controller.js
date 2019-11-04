const {
  postComment,
  fetchCommentsById,
  updateCommentById,
  removeCommentById
} = require("../models/comments-models");

exports.sendComment = (req, res, next) => {
  const author = req.body.username;
  const comment = req.body.body;
  const articleId = req.params.article_id;

  postComment(author, comment, articleId)
    .then(comment => {
      res.status(201).send({ comment: comment[0] });
    })
    .catch(next);
};

exports.getCommentsById = (req, res, next) => {
  const articleId = req.params.article_id;

  fetchCommentsById(req, articleId)
    .then(response => {
      res.status(200).send({ comments: response });
    })
    .catch(next);
};

exports.patchCommentById = (req, res, next) => {
  updateCommentById(req.params.comment_id, req.body)
    .then(([comment]) => {
      res.status(200).send({ comment });
    })
    .catch(next);
};

exports.deleteCommentById = (req, res, next) => {
  removeCommentById(req.params.comment_id)
    .then(comments => {
      res.status(204).send();
    })
    .catch(next);
};
