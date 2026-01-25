import "./App.css";
import { Provider } from "jotai";
import {
  AdminRenderer,
  RenderInput,
  UsersRenderer,
} from "./components/usersRenderer";

function App() {
  return (
    <Provider>
      <AdminRenderer />
      <UsersRenderer />
      <RenderInput />
    </Provider>
  );
}

export default App;
