const express = require("express");
const cors = require("cors");
const { newTodo, updateTodo } = require("./types");
const { Todo } = require("./db");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/todos", async function (req, res) {
  const payload = req.body;
  const parsed = newTodo.safeParse(payload);

  if (!parsed.success) {
    res.status(400).json({
      msg: "Bad Request: Invalid input data",
    });
    return;
  }

  const data = parsed.data; //parsed.data is the sanitized with all the zod validation and sanitization

  await Todo.create({
    title: data.title,
    description: data.description,
    completed: false,
  });

  res.status(201).json({
    msg: "Todo created successfully",
  });
});

app.get("/todos", async function (req, res) {
  const allTodos = await Todo.find({});
  res.status(200).json({
    todos: allTodos,
  });
});

app.put("/todos", async function (req, res) {
  const payload = req.body;
  const parsed = updateTodo.safeParse(payload);
  if (!parsed.success) {
    res.status(400).json({
      msg: "Invalid id",
    });
  }

  const data = parsed.data; //parsed.data is the sanitized with all the zod validation and sanitization

  await Todo.update(
    {
      _id: data.id,
    },
    {
      completed: true,
    }
  );
  res.status(200).json({
    msg: "Todo marked as completed",
  });
});

app.listen(3000);
