const fs = require("fs");

fs.writeFile("1.txt", "New data added \n", { flag: "a" }, (err) => {
  if (err) throw err;
  console.log("new text inserted");
});
