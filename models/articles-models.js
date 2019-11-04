const connection = require("../db/connection");

exports.getArticleById = id => {
  return connection("articles")
    .select("articles.*")
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "comments.article_id", "=", "articles.article_id")
    .groupBy("articles.article_id")
    .where("articles.article_id", "=", id)
    .returning("*")
    .then(response => {
      if (response.length === 0) {
        return Promise.reject({ msg: "article does not exist" });
      } else {
        return response;
      }
    });
};

exports.updateArticleById = (id, body) => {
  const incrementAmount = body.inc_votes || 0;

  return connection("articles")
    .where("article_id", "=", id)
    .increment("votes", incrementAmount)
    .returning("*");
};

exports.getArticles = ({
  query: { sort_by = "created_at", order = "desc", author, topic }
}) => {
  const columns = [
    "articles.author",
    "articles.title",
    "articles.article_id",
    "articles.topic",
    "articles.created_at",
    "articles.votes"
  ];
  const obj = { asc: "asc", desc: "desc" };

  const testQuery = connection("articles")
    .select(columns)
    .count({ comment_count: "comments.article_id" })
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .orderBy(sort_by, obj[order] || "desc")
    .modify(modifier => {
      if (author) modifier.where("articles.author", "=", author);
      if (topic) modifier.where("articles.topic", "=", topic);
    });

  const queries = [testQuery];
  if (topic) {
    queries.push(checkTopics(topic));
  }
  if (author) {
    queries.push(checkAuthors(author));
  }

  return Promise.all(queries)
    .then(response => {
      return response[0];
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

// <------------ Helper functions -------------->
const checkTopics = topicCheck => {
  return connection("articles")
    .select("*")
    .where("topic", "=", topicCheck)
    .then(topic => {
      if (topic.length === 0) {
        return Promise.reject({ msg: "topic does not exist" });
      }
    });
};

const checkAuthors = authorCheck => {
  return connection("articles")
    .select("*")
    .where("author", "=", authorCheck)
    .then(author => {
      if (author.length === 0) {
        return Promise.reject({ msg: "author does not exist" });
      }
    });
};
