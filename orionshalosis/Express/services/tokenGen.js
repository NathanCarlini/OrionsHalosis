var fs = require("fs");

function tokenGen() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!.:";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 20) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  fs.writeFile("token.txt", result, function (err) {
    if (err) throw err;
    console.log("Saved!");
  });
  // console.log(result);
  return result;
}
module.exports = {
  tokenGen
};
