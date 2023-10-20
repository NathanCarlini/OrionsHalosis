const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function getMultiple(page = 1) {
  const rows = await db.query(`SELECT * FROM role`);
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
}
async function create(programmingLanguage) {
  // console.log(programmingLanguage);
  const result = await db.query(
    `INSERT INTO user(username, email, password, creationdate) VALUES
      ('${programmingLanguage.username}', '${programmingLanguage.email}', '${programmingLanguage.password}', '2023-10-20')`,
  );

  let message = "Error in creating programming language";

  if (result.affectedRows) {
    message = "Programming language created successfully";
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
};
