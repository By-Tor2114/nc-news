exports.formatDates = list => {
  const result = [];

  list.forEach(item => {
    result.push({ ...item });
  });

  result.forEach(article => {
    article.created_at = new Date(article.created_at);
  });

  return result;
};

exports.makeRefObj = list => {
  const result = {};

  list.forEach(ref => {
    result[ref.title] = ref.article_id;
  });

  return result;
};

exports.formatComments = (comments, articleRef) => {
  const result = [];

  comments.forEach(comment => {
    result.push({ ...comment });
  });

  result.forEach(comment => {
    comment.author = comment.created_by;
    delete comment.created_by;

    comment.article_id = articleRef[comment.belongs_to];
    delete comment.belongs_to;

    comment.created_at = new Date(comment.created_at);
  });

  return result;
};
