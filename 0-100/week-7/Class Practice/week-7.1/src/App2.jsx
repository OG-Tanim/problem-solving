import { useContext, useState } from "react";
import CountContext from "./components/context";

function App() {
  const [count, setCount] = useState(0);

  return (
    <CountContext.Provider value={{ count, setCount }}>
      {" "}
      {/*passed in as CountContext.Provider = { count: count, setCount: setCount } */}
      <div>
        <CountWrapper />
      </div>
    </CountContext.Provider>
  );
}

function CountWrapper() {
  const { count } = useContext(CountContext);
  return (
    <div>
      <div> {count} </div>
      <Counter />
    </div>
  );
}

function Counter() {
  const { count, setCount } = useContext(CountContext);
  return (
    <div>
      <button
        onClick={() => {
          setCount((c) => c + 1);
        }}
      ></button>
      <p>Count is {count}</p>
    </div>
  );
}

export default App;
