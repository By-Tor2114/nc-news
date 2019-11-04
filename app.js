const express = require("express");
const app = express();
app.use(express.json());
const cors = require("cors");
const apiRouter = require("./routes/api-router");

app.use(cors());

const {
  handle400s,
  handleCustomErrors,
  handleModel404s,
  handle500s
} = require("./errors/index");

app.use("/api", apiRouter);
app.all("/*", (req, res, next) => {
  res.status(404).send({ msg: "path not found" });
});

app.use(handle400s);
app.use(handleCustomErrors);
app.use(handleModel404s);
app.use(handle500s);

module.exports = { app };
