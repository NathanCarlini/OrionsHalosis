const mysql = require("mysql");
const bcrypt = require("bcrypt");
const userGetData = require("./userGetData");

async function create(user) {
  const connection = mysql.createConnection({
    host: "chevallereau-swan.com",
    user: "fbpf9239_Admin",
    password: "nNWe}p9&Ocy6nfkdbrkhVDGILgkio",
    database: "fbpf9239_OrionsHalosis",
  });

  connection.connect();
  console.log("connected");
  const query = "INSERT INTO user SET ?";

  bcrypt.hash(user.password, 10, function (err, hash) {
    // if (err) return callback(err);
    console.log("hashed");

    const insert = {
      password: hash,
      email: user.email,
    };
    console.log("readytoquery");

    connection.query(query, insert, function (err, results) {
      // callback(null);
      if (err) return console.log(err);
      return results;
    });
  });
}

async function check(user) {
  let allData;
  allData = await userGetData.getAllData(user);

  console.log(allData);
  bcrypt.compare(user.password, allData.password, (err, res) => {
    if (err) return console.log("err");
    return res;
  }) == true
    ? res.json({ token: "ok" })
    : res.json({ token: "Nok" });
}

module.exports = {
  create,
  check,
};
