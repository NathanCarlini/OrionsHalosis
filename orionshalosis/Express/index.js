const userCreation = require("./services/userCreation");
const userGetData = require("./services/userGetData");
const express = require("express");
const app = express();
const port = 8080;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const sessions = require("express-session");
var cors = require("cors");
require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(cookieParser());
app.use(
  sessions({
    secret: `${process.env.EX_SECRET}`,
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false,
  }),
);
var session;
app.post("/userCreation", (req, res, next) => {
  session = req.session;
  session.userid = req.body.email;
  userCreation.create(req.body);
  res.json({
    token: "psdfdsfsdf",
  });
});

app.get("/checkIfSession", (req, res, next) => {
  if (typeof session !== undefined) {
    res.json(true);
  } else {
    res.json(false);
  }
});

app.get("/userGetData", (req, res, next) => {
  if (session) {
    console.log(session.userid);
    let data = userGetData.getAllData(session.userid);
    next(
      res.json({
        data,
      }),
    );
  } else {
    res.json(false);
  }
});

app.get("/checkIfSession&Data", (req, res, next) => {
  console.log(session);
  if (session != undefined) {
    let data = userGetData.getAllData(session.userid);
    next(
      res.json({
        data,
      })
    );
  } else {
    res.end()
  }
});

app.put("/userLogin", (req, res, next) => {
  userCreation.check(req.body);
  res.json({
    token: "p",
  });
  res.end();
});

app.put("/logOut", (req, res, next) => {
  req.session = null
  res.end();
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
