import { useRef, useState } from "react";

export function ParaGenerator() {
  const inputRef = useRef(); //init value set to empty string""

  const [paragraph, setParagraph] = useState("");

  const words = [
    "apple",
    "banana",
    "cherry",
    "date",
    "elderberry",
    "fig",
    "grape",
    "honeydew",
    "kiwi",
    "lemon",
    "mango",
    "nectarine",
    "orange",
    "papaya",
    "quince",
    "raspberry",
    "strawberry",
    "tangerine",
    "ugli fruit",
    "vanilla",
    "watermelon",
    "xigua",
    "yuzu",
    "zucchini",
    "aardvark",
    "baboon",
    "camel",
    "dolphin",
    "elephant",
    "flamingo",
    "giraffe",
    "hippo",
    "iguana",
    "jaguar",
    "kangaroo",
    "lemur",
    "monkey",
    "narwhal",
    "otter",
    "panda",
    "quokka",
    "rhinoceros",
    "seal",
    "tiger",
    "umbrella",
    "vulture",
    "walrus",
    "xenopus",
    "yak",
    "zebra",
  ];

  function Clicked() {
    console.log(inputRef);

    let para = "";
    for (let i = 0; i < Number(inputRef.current.value); i++) {
      const word = words[Math.floor(Math.random() * words.length)];
      para = para + word + " ";
    }
    setParagraph(para);
  }

  return (
    <div
      style={{
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ marginBottom: "15px" }}>
        <input
          ref={inputRef}
          type="text"
          placeholder="input the length of your paragraph"
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "5px",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      </div>
      <button
        onClick={Clicked}
        style={{
          padding: "10px 20px",
          fontSize: "16px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          marginBottom: "20px",
        }}
      >
        Generate Paragraph
      </button>
      {paragraph && (
        <div
          style={{
            padding: "15px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #e9ecef",
            borderRadius: "5px",
            lineHeight: "1.6",
          }}
        >
          <p style={{ margin: "0", color: "#333" }}>{paragraph}</p>
        </div>
      )}
    </div>
  );
}
