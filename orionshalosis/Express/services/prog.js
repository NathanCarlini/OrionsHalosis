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
// async function create(programmingLanguage) {
//   const result = await db.query(
//     `INSERT INTO user
//       (name, released_year, githut_rank, pypl_rank, tiobe_rank)
//       VALUES
//       ('${programmingLanguage.name}', ${programmingLanguage.released_year}, ${programmingLanguage.githut_rank}, ${programmingLanguage.pypl_rank}, ${programmingLanguage.tiobe_rank})`,
//   );

//   let message = "Error in creating programming language";

//   if (result.affectedRows) {
//     message = "Programming language created successfully";
//   }

//   return { message };
// }

module.exports = {
  getMultiple,
};
