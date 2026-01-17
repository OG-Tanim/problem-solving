import { useState } from "react";
import "./App.css";
import { CreateTodo } from "./components/createTodo";
import { AllTodos } from "./components/allTodos";

function App() {
  const [todos, setTodos] = useState([]);

  fetch("http://localhost:3000/todos").then(async (res) => {
    const json = await res.json();
    setTodos(json.todos);
  });

  return (
    <div>
      <CreateTodo />
      <AllTodos todos={todos} />
    </div>
  );
}

export default App;
``;
