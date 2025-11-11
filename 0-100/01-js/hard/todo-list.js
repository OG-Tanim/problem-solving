/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor() {
    this.todos = [];
  }
  add(todo) {
    this.todos.push(todo);
  }
  remove(idx) {
    this.todos.splice(idx, 1);
  }
  update(idx, todo) {
    if (!this.todos[idx]) {
      return;
    }
    this.todos[idx] = todo;
  }

  getAll() {
    return this.todos;
  }
  get(idx) {
    if (!this.todos[idx]) {
      return null;
    }
    return this.todos[idx];
  }
  clear() {
    this.todos.length = 0;
  }
}

// c = new Todo();
// let arr = c.todos;
// console.log(arr);

module.exports = Todo;
