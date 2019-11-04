const connection = require("../db/connection");

exports.postComment = (author, comment, article_id) => {
  if (
    author === undefined ||
    comment === undefined ||
    article_id === undefined
  ) {
    return Promise.reject({ code: "400" });
  }
  return connection("comments")
    .insert({
      body: comment,
      author: author,
      article_id: article_id
    })
    .returning("*");
};

exports.fetchCommentsById = (
  { query: { sort_by = "created_at", order = "desc" } },
  id
) => {
  if (order === "asc" || order === "desc") {
    return connection("comments")
      .where("article_id", "=", id)
      .orderBy(sort_by, order)
      .returning("*")
      .then(comments => {
        return comments.length === 0
          ? Promise.reject({ code: "404", msg: "article does not exist" })
          : comments;
      });
  } else {
    return connection("comments")
      .where("article_id", "=", id)
      .orderBy(sort_by, "desc")
      .returning("*")
      .then(comments => {
        return comments.length === 0
          ? Promise.reject({ code: "404", msg: "article does not exist" })
          : comments;
      });
  }
};

exports.updateCommentById = (id, body) => {
  const incrementAmount = body.inc_votes || 0;
  return connection("comments")
    .where("comment_id", "=", id)
    .increment("votes", incrementAmount)
    .returning("*")
    .then(response => {
      if (response.length === 0) {
        return Promise.reject({ msg: "comment does not exist" });
      } else {
        return response;
      }
    });
};

exports.removeCommentById = id => {
  return connection("comments")
    .where("comment_id", "=", id)
    .del();
};
