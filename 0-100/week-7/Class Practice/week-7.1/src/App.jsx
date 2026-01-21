import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { lazy, Suspense } from "react";

const Dashboard = lazy(() => import("./components/dashboad"));
const LandingPage = lazy(() => import("./components/landingPage"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <Appbar />
        <Routes>
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={"...loading"}>
                <Dashboard />
              </Suspense>
            }
          />
          <Route
            path="/"
            element={
              <Suspense fallback={"...loading"}>
                <LandingPage />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function Appbar() {
  const navigate = useNavigate();

  return (
    <div style={{ borderBottom: "1px solid #000000" }}>
      this is the topbar
      <button
        onClick={() => {
          navigate("/dashboard");
        }}
      >
        Dashboard
      </button>
      <button
        onClick={() => {
          navigate("/");
        }}
      >
        Landing Page
      </button>
    </div>
  );
}

export default App;
