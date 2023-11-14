const mysql = require("mysql");
var config = require("../config");

const pool = mysql.createPool(config.db);

async function getAllData(user) {
  console.log("connected");
  const query =
    "SELECT iduser, username, email, password FROM user WHERE email = ?";

  const insert = {
    email: user
  };
  try {
    pool.query(query, insert);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  getAllData,
};
