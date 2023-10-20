const db = require("./db");
const helper = require("../helper");
const config = require("../config");

async function create(createAccount) {
  const result = await db.query(
    `INSERT INTO user 
      (username, email, password, creationdate) 
      VALUES 
      (${createAccount.name}, ${createAccount.email}, ${createAccount.password}, '2023-10-20'`,
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
