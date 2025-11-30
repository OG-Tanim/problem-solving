const fs = require("fs");

console.log("1st log");

fs.readFile("./1.txt", "utf8", (err, data) => {
  if (err) throw err;
  console.log(data);
});

console.log("2nd log");

let count = 0;
for (let i = 0; i < 10000000000; i++) {
  count++;
}
console.log(count);
