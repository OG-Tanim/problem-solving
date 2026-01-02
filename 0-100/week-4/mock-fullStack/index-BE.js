const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/sum", (req, res) => {
  const a = req.query.a;
  const b = req.query.b;
  let ans = parseInt(a) + parseInt(b);
  res.send(ans.toString());
});

app.listen(8080, () => {
  console.log("backend up and running");
});
