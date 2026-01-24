import "./App.css";
import { Provider } from "jotai";
import { AdminRenderer, UsersRenderer } from "./components/usersRenderer";

function App() {
  return (
    <Provider>
      <AdminRenderer />
      <UsersRenderer />
    </Provider>
  );
}

export default App;
