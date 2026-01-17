import { useState } from "react";
import "./App.css";
import { Card } from "./components/card";

function App() {
  const [state, setState] = useState([
    {
      name: "Jhon",
      description: "junior full stack developer",
      interests: ["novo stack", "mern stack", "ios"],
      linkedIn: "https://linkedin.com/somebody.named.me",
      twitter: "http://twitter.com/somebody.named.me",
      otherSocials: [
        {
          platform: "Facebook",
          link: "https://facebook.com/somebody.named.me",
        },
        { platform: "LinkedIn", link: "https://linkedin.com/somebody.name.me" },
      ],
    },
  ]);

  return (
    <div>
      <Card state={state}></Card>
    </div>
  );
}

export default App;
