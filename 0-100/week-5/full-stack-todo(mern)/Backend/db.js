const mongoose = require("mongoose");
const { boolean } = require("zod");

mongoose.connect(
  "mongodb+srv://node-crud-api-backend:tX5g9QCwrALUp6NE@cluster0.vyhfyba.mongodb.net/cohort-1?appName=Cluster0"
);

const todoSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = {
  Todo,
};
