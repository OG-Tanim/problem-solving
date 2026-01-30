import "./App.css";
//hook - that hooks state elements that triggers updates in DOM
import { useState } from "react";

// response: {
//   todos: [
//     {
//       title: "go to gym",
//       description: "go to the gym from 7-9",
//       completed: false,
//     },
//     {
//       title: "do some DSA",
//       description: "do DSA from 10-12",
//       compeleted: false,
//     },
//   ]
// }

let id = 0;

function App() {
  const [todos, setTodos] = useState([
    {
      title: "go to gym",
      description: "go to the gym from 7-9",
      completed: false,
    },
    {
      title: "do some DSA",
      description: "do DSA from 10-12",
      compeleted: false,
    },
    {
      title: "do some DSA",
      description: "do DSA from 10-12",
      compeleted: false,
    },
    {
      title: "do some DSA",
      description: "do DSA from 10-12",
      compeleted: false,
    },
    {
      title: "do some DSA",
      description: "do DSA from 10-12",
      compeleted: false,
    },
  ]);

  function buttonClick() {
    setTodos([
      ...todos,
      {
        title: "newTodo",
        description: "newDescriton",
        compeleted: false,
      },
    ]);
  }

  return (
    <div>
      <button onClick={buttonClick}> </button>
      {todos.map((todo) => {
        return (
          <TodoComponent title={todo.title} description={todo.description} />
        );
      })}
    </div>
  );
}

//defining a component
function TodoComponent(props) {
  return (
    <div>
      <div>{props.title}</div> <br />
      <div>{props.description}</div> <br />
    </div>
  );
}

export default App;
