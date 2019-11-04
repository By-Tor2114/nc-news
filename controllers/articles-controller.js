const {
  getArticleById,
  updateArticleById,
  getArticles
} = require("../models/articles-models");

exports.fetchArticleById = (req, res, next) => {
  const article_id = req.params.article_id;

  getArticleById(article_id)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  updateArticleById(req.params.article_id, req.body)
    .then(article => {
      res.status(200).send({ article: article[0] });
    })
    .catch(next);
};

exports.fetchArticles = (req, res, next) => {
  getArticles(req)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
