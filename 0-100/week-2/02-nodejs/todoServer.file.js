const express = require("express");
const fs = require("fs");
const path = require("path");

const PORT = 30002;

const app = express();

app.use(express.json());

app.get("/todos", (req, res) => {
  fs.readFile("./files/todos.json", "utf8", (err, data) => {
    if (err) throw err;
    console.log(data);
    res.json(JSON.parse(data)); //fs.readfile returns a stirngified object.
  });
});

app.get("/todos/:id", (req, res) => {
  fs.readFile("./files/todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const array = JSON.parse(data);
    const todo = array.find((t) => t.id === parseInt(req.params.id));
    if (!todo) {
      return res.status(404).send();
    }
    res.json(todo);
  });
});

app.post("/todos", (req, res) => {
  const newTodo = {
    id: Math.floor(Math.random() * 100000),
    title: req.body.title,
    description: req.body.description,
  };

  fs.readFile("./files/todos.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    todos.push(newTodo);
    fs.writeFile("./files/todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(201).json(newTodo);
    });
  });
});

app.put("/todos/:id", (req, res) => {
  fs.readFile("./files/todos.json", "utf8", (err, data) => {
    if (err) throw err;
    let todos = JSON.parse(data);
    const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send();
    }
    if (req.body.title) {
      todos[index].title = req.body.title;
    }
    if (req.body.description) {
      todos[index].description = req.body.description;
    }
    fs.writeFile("./files/todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).json("Updated");
    });
  });
});

app.delete("/todos/:id", (req, res) => {
  fs.readFile("./files/todos.json", "utf8", (err, data) => {
    if (err) throw err;
    const todos = JSON.parse(data);
    const index = todos.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
      return res.status(404).send();
    }
    todos.splice(index, 1);
    fs.writeFile("./files/todos.json", JSON.stringify(todos), (err) => {
      if (err) throw err;
      res.status(200).send();
    });
  });
});

app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(PORT, () => {
  console.log("Server started sunccessfully");
});

module.exports = app;
