import "./App.css";
import useIsOnline from "./hooks/isOnlineHook";
import useMousePointer from "./hooks/mousePositionHook";
import useWindowSize from "./hooks/windowSizeHook";
import useInterval from "./hooks/intervalHook";
import { useEffect, useState } from "react";
import useDebounce from "./hooks/useDebounce";

function App() {
  return (
    <>
      {" "}
      <Component1 />
      {/* <Component2 /> */}
      <Component3 />
      <Component4 />
      <Searchbar />
    </>
  );
}

function Component1() {
  const isOnline = useIsOnline();

  return <div> {isOnline ? <>user is online</> : <>user is offline</>} </div>;
}

function Component2() {
  const mousePos = useMousePointer();

  return (
    <div>
      {" "}
      Your mouse co-ordinates are {`X: ${mousePos.x}, Y: ${mousePos.y}`}
    </div>
  );
}

function Component3() {
  const size = useWindowSize();

  return (
    <div>
      {" "}
      Your Window size is {size.width} * {size.height}
    </div>
  );
}

function Component4() {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount((c) => c + 1);
  }, 1000);

  return <div> Count {count}</div>;
}

function Searchbar() {
  const [input, setInput] = useState("");

  let timeoutId;

  const debouncedInput = (e) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      setInput(e.target.value);
    }, 500);
  };

  return (
    <div>
      <input onChange={debouncedInput} type="text" />
      <div>{input}</div>
    </div>
  );
}
export default App;
