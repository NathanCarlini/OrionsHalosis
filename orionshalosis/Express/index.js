const express = require("express");
const app = express();
const port = 3001;
const prog = require("./services/prog");
const bodyParser = require('body-parser')

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
app.post("/", async function (req, res, next) {
  console.log(req.body);
  try {
    res.json(await prog.create(req.body));
  } catch (err) {
    console.error(`Error while creating programming language`, err.message);
    next(err);
  }
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
