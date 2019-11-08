const connection = require("../db/connection");

exports.getUserById = user => {
  return connection
    .select("*")
    .from("users")
    .where("username", "=", user)
    .returning("*")
    .then(response => {
      if (response[0] === undefined) {
        return Promise.reject({ msg: "user does not exist" });
      } else {
        return response;
      }
    });
};

exports.fetchAllUsers = () => {
  return connection
    .select("*")
    .from("users")
    .returning("*")
    .then(response => {
      return response;
    });
};
