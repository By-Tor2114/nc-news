exports.handle400s = (err, req, res, next) => {
  const errCodes = ["22P02", "42703", "400"];

  if (errCodes.includes(err.code)) {
    res.status(400).send({ msg: "bad request" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.code === "23503") {
    res.status(404).send({ msg: "user does not exist" });
  } else {
    next(err);
  }
};

exports.handleModel404s = (err, req, res, next) => {
  if (
    err.msg === "topic does not exist" ||
    err.msg === "author does not exist" ||
    err.msg === "article does not exist" ||
    err.msg === "comment does not exist" ||
    err.msg === "user does not exist" ||
    err.code === "404"
  ) {
    res.status(404).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle500s = (err, req, res, next) => {
  res.status(500).send({ msg: "internal server error" });
};

// <----- Router error handling ----->
exports.handle405s = (req, res, next) => {
  res.status(405).send({ msg: "method not allowed" });
};
