import "./App.css";
//hook - that hooks state elements that triggers updates in DOM
import { useState } from "react";

// let state = {
//   count: 0,
// };
function App() {
  const [count, setCount] = useState(0); //[1, 2] - setting up the hook: state to rerenderer makes React WATCH
  // the count variable for updates

  //Finally return the comoponent in RAW XML: REACT can figure out how to update this on it's own
  //Where State is the Dynamic part of component
  return (
    <div>
      <CustomButton count={count} setCount={setCount} />
    </div>
  ); //{count} is the state and {setCount} is the rerenderer for react.useStaete which have been passed in as args in the fucntion that returns the XML element we want
}

//defining a component
function CustomButton(props) {
  //props: { count: count, setCount: setCount}

  function buttonClick() {
    props.setCount(props.count + 1);
  } //triggering the rerenderer with the updated-state

  return <button onClick={buttonClick}>Counter {props.count}</button>;
}

export default App;
