import { useState, useEffect, memo, use } from "react";
import axios from "axios";

import "./App.css";

function App() {
  const [num, setNum] = useState(1);
  return (
    <div>
      {/* <input id="input" type="text" placeholder="input the todoId" />
      <Todo id={useRef(null, (ref) => ref?.currentValue?.value)} /> */}
      <button
        onClick={() => {
          setNum(1);
        }}
      >
        {" "}
        {num}{" "}
      </button>
      <button
        onClick={() => {
          setNum(2);
        }}
      >
        {" "}
        {num}{" "}
      </button>
      <button
        onClick={() => {
          setNum(3);
        }}
      >
        {" "}
        {num}{" "}
      </button>
      <button
        onClick={() => {
          setNum(4);
        }}
      >
        {" "}
        {num}{" "}
      </button>
      <Todo id={num}></Todo>
    </div>
  );
}

function Todo({ id }) {
  const [todo, setTodo] = useState({});

  useEffect(() => {
    axios.get("https://100xdevs.co.in?id" + { id }).then((response) => {
      setTodo(response.data.todo);
    });
  }, [id]);

  return (
    <div>
      <h1>{todo.title}</h1>
      <h4>{todo.description}</h4>
    </div>
  );
}

export default App;
