const bcrypt = require("bcrypt");
const userGetData = require("./userGetData");
const mysql = require("mysql");
var config = require("../config");

const pool = mysql.createPool(config.db);

function create(user) {
  const query = "INSERT INTO user SET ?";

  bcrypt.hash(user.password, 10, function (err, hash) {
    const insert = { password: hash, email: user.email };

    try {
      pool.query(query, insert);
    } catch (err) {
      console.error(err);
    }
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

// async function create(user, pool) {
//   const conn = await pool.getConnection();
//   const query = "INSERT INTO user SET ?";
//   bcrypt.hash(user.password, 10, function (err, hash) {
//     // if (err) return callback(err);
//     console.log("hashed");

//     const insert = {
//       password: hash,
//       email: user.email,
//     };
//     console.log("readytoquery");

//     conn.query(query, insert).then((result) => {
//       conn.release();
//       return result;
//     });
//     if (err) {
//       console.log(err);
//       callback(true);
//       return;
//     }
//     conn.release();
//   });
// }
