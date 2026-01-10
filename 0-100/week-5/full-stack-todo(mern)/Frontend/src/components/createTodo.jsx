import { useState } from "react";

export function CreateTodo() {
  const [input, setInput] = useState({});
  console.log(input);

  function newTodo() {
    fetch("http://localhost:3000/todos", {
      method: "POST",
      body: JSON.stringify({
        title: input.title,
        description: input.description,
      }),
      headers: {
        "Content-type": "application/json",
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
          setInput({ ...input, title: e.target.value });
        }}
      />
      <br />
      <br />
      <input
        type="text"
        placeholder="please input a description"
        onChange={(e) => {
          setInput({ ...input, description: e.target.value });
        }}
      />
      <br />
      <br />
      <button onClick={newTodo}>Add todo</button>
    </div>
  );
}
