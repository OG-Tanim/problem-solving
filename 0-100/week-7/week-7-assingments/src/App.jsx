import "./App.css";
import { GitHub } from "./components/github";
import { ParaGenerator } from "./components/paragraph";
import { OtpLogin } from "./components/otp";

function App() {
  return (
    <>
      <GitHub />
      <ParaGenerator />
      <OtpLogin />
    </>
  );
}

export default App;
