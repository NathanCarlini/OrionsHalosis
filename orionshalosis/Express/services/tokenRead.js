var fs = require("fs");

function tokenRead(tkn) {
  fs.readFile("token.txt", "utf8", (err, data) => {
    //   if (err) throw err;
    tkn == data ? console.log(true) : console.log(false);
  });
}

tokenRead("q5psPCG9qa6PeWhaTzmh");

module.exports = {
  tokenRead,
};
