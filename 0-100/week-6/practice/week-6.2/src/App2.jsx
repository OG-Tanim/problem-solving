import { useMemo, useState, useRef } from "react";

function App() {
  const [input, setInput] = useState(0);
  const [count, setCount] = useState(0);
  const timeoutId = useRef("");

  function inputHandler(value) {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      setInput(value);
    }, 1000);
  }

  let summation = useMemo(() => {
    let sum = 0;
    for (let i = 1; i <= input; i++) {
      sum = sum + i;
    }
    return sum;
  }, [input]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
      }}
    >
      <input
        ref={inputId}
        onChange={(e) => {
          inputHandler(parseInt(e.target.value));
        }}
        type="text"
        placeholder="give a number"
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          border: "2px solid #ddd",
          borderRadius: "8px",
          width: "200px",
          textAlign: "center",
          outline: "none",
          transition: "border-color 0.3s ease",
        }}
      />
      <div
        style={{
          fontSize: "18px",
          fontWeight: "bold",
          color: "#333",
          padding: "15px 25px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        }}
      >
        input from 0 - {input} is {summation}
      </div>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
          fontWeight: "bold",
        }}
      >
        counter value {count}
      </button>
    </div>
  );
}

export default App;
