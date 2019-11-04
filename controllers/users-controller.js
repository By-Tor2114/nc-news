const { getUserById } = require("../models/users-models");

exports.fetchUserById = (req, res, next) => {
  const { username } = req.params;

  getUserById(username)
    .then(user => {
      res.status(200).send({ user: user[0] });
    })
    .catch(next);
};
