import { useState, useCallback, memo } from "react";

function App() {
  const clickFunction = useCallback(() => {
    console.log("button clicked");
  }, []);

  const [count, setCount] = useState(0);

  return (
    <div>
      <ButtonComponent inputFn={clickFunction} />
      <button onClick={() => setCount(count + 1)}>count {count}</button>
    </div>
  );
}

const ButtonComponent = memo(({ inputFn }) => {
  console.log("rerendered");
  return <button onClick={inputFn}>Click me</button>;
});

export default App;
