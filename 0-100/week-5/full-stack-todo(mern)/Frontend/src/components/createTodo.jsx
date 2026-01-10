import { use, useState } from "react";

export function CreateTodo() {
  const [input, setInput] = useState({});

  function newTodo() {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: input.title,
        description: input.description,
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then(() => {
      alert("New todo created");
    });
  }

  return (
    <div>
      <input
        type="text"
        placeholder="please input a title"
        onChange={(e) => {
          setInput({ title: e.target.value });
        }}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="please input a description"
        onChange={(e) => {
          setInput({ description: e.target.value });
        }}
      />
      <br />
      <br />
      <button onClick={newTodo}>Add todo</button>
    </div>
  );
}
