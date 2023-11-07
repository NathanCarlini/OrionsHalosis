const userCreation = require("./services/userCreation");
const userGetData = require("./services/userGetData");
const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
var cors = require("cors");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get("/userGetData", (req, res, next) => {
  let data = userGetData.getAllData(req.body);
  next(
    console.log(data),
    res.json({
      data
    }),
  );
});

app.post("/userCreation", (req, res, next) => {
  userCreation.create(req.body);
  res.json({
    token: "p",
  });
});

app.put("/userLogin", (req, res, next) => {
  userCreation.check(req.body);
  res.json({
    token: "p",
  });
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
