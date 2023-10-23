const express = require("express");
const app = express();
const port = 3001;
const prog = require("./services/prog");
const bodyParser = require("body-parser");

var cors = require("cors");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.post("/", (req, res, next) => {
  res.json(prog.create(req.body));
  // res.status(201).json({
  //   message: "Objet créé !",
  // });
});

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
