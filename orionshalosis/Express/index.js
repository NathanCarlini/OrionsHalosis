const express = require("express");
const app = express();
const port = 3001;
const prog = require("./services/prog");
const bodyParser = require("body-parser");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.json({ message: "ok" });
});
app.post("/", (req, res, ) => {
  console.log(req.body);
  res.json(prog.create(req.body));
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
