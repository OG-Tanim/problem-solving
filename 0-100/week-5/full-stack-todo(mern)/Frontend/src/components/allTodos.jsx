export function AllTodos({ todos }) {
  return (
    <div>
      {todos.map((todo) => {
        return (
          <div>
            <h1>{todo.title}</h1>
            <br />
            <h3>{todo.description}</h3>
            <br />
            <button>
              {todo.completed === false ? "Mark as complete" : "Completed"}
            </button>
          </div>
        );
      })}
    </div>
  );
}
