exports.getApiDescription = (req, res, next) => {
  res.status(200).send({
    description: {
      Topics: {
        "GET /": "Displays a collection of available topics."
      },
      Users: {
        "GET /:username":
          "Displays information about a particular user, such as their username and personal avatar."
      },
      Articles: {
        "GET /":
          "Displays an array of all current articles and their information, this can then be sorted by any given valid property as well as ordered in ascending or descending order. These results can also be filtered by any combination of author and topic.",
        "GET /:article_id":
          "Displays information from a particular article, such as it's title, votes, author, comment count, etc.",
        "PATCH /:article_id":
          "Updates the given articles vote count (positive or negative).",
        "POST /:article_id/comments":
          "Allows a user to post a new comment to a particular article (requiring a comment body and a valid username).",
        "GET /:article_id/comments":
          "Displays all available comments for a particular article and their corresponding information."
      },
      Comments: {
        "PATCH /:comment_id":
          "Allows the updating of a comments vote by either positive or negative integer.",
        "DELETE /:comment_id":
          "Allows for a particular comment to be deleted. This returns no data."
      }
    }
  });
};
