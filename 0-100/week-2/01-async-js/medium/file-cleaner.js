const fs = require("fs");

fs.readFile("./1.txt", "utf8", (err, data) => {
  //   data = JSON.stringify(data);
  console.log(data);
  let n = data.replace(/[\s]+/g, " ");
  console.log(n);
  fs.writeFile("./1.txt", n, (err) => {
    if (err) throw err;
    console.log("file content has been cleaned");
  });
});
