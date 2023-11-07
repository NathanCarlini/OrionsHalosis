const mysql = require("mysql");
async function getAllData(user) {

  const connection = mysql.createConnection({
    host: "chevallereau-swan.com",
    user: "fbpf9239_Admin",
    password: "nNWe}p9&Ocy6nfkdbrkhVDGILgkio",
    database: "fbpf9239_OrionsHalosis",
  });

  connection.connect();
  console.log("connected");
  const query =
    'SELECT iduser, username, email, password FROM user WHERE email = ?';

  const insert = {
    email: user.email,
  };

  connection.query(query, insert, function (err, results) {
    // callback(null);
    if (err) return console.log(err);
    return results;
  });
}

module.exports = {
    getAllData,
};
