import { Suspense, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

function InputPhone() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/inputOTP");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: "0 0 30px 0",
            color: "#333",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Enter Phone Number
        </h2>
        <input
          type="text"
          placeholder="Enter your phone number"
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            border: "2px solid #ddd",
            borderRadius: "8px",
            marginBottom: "20px",
            boxSizing: "border-box",
            transition: "border-color 0.3s",
          }}
        />
        <button
          onClick={handleClick}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "background-color 0.3s",
          }}
        >
          Send OTP
        </button>
      </div>
    </div>
  );
}

function InputOtp() {
  const navigate = useNavigate();

  const first = useRef();
  const second = useRef();
  const third = useRef();
  const fourth = useRef();
  const btn = useRef();

  const handleClick = () => {
    navigate("/inputPhone");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "40px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            margin: "0 0 30px 0",
            color: "#333",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Enter OTP
        </h2>
        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "30px",
            justifyContent: "center",
          }}
        >
          <input
            ref={first}
            onChange={() => {
              second.current.focus();
            }}
            type="text"
            maxLength="1"
            style={{
              width: "50px",
              height: "50px",
              fontSize: "20px",
              textAlign: "center",
              border: "2px solid #ddd",
              borderRadius: "8px",
              transition: "border-color 0.3s",
            }}
          />
          <input
            ref={second}
            onChange={() => {
              third.current.focus();
            }}
            type="text"
            maxLength="1"
            style={{
              width: "50px",
              height: "50px",
              fontSize: "20px",
              textAlign: "center",
              border: "2px solid #ddd",
              borderRadius: "8px",
              transition: "border-color 0.3s",
            }}
          />
          <input
            ref={third}
            onChange={() => {
              fourth.current.focus();
            }}
            type="text"
            maxLength="1"
            style={{
              width: "50px",
              height: "50px",
              fontSize: "20px",
              textAlign: "center",
              border: "2px solid #ddd",
              borderRadius: "8px",
              transition: "border-color 0.3s",
            }}
          />
          <input
            ref={fourth}
            onChange={() => {
              btn.current.focus();
            }}
            type="text"
            maxLength="1"
            style={{
              width: "50px",
              height: "50px",
              fontSize: "20px",
              textAlign: "center",
              border: "2px solid #ddd",
              borderRadius: "8px",
              transition: "border-color 0.3s",
            }}
          />
        </div>
        <button
          ref={btn}
          onClick={handleClick}
          style={{
            width: "100%",
            padding: "15px",
            fontSize: "16px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "600",
            transition: "background-color 0.3s",
          }}
        >
          Log In
        </button>
      </div>
    </div>
  );
}

export function OtpLogin() {
  return (
    <div>
      <BrowserRouter>
        <div
          style={{
            textAlign: "center",
            padding: "20px",
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            marginBottom: "20px",
          }}
        >
          <h1
            style={{
              margin: "0",
              color: "#333",
              fontSize: "28px",
              fontWeight: "700",
              borderRadius: "20px",
            }}
          >
            Login via OTP
          </h1>
        </div>
        <Routes>
          <Route
            path="/inputPhone"
            element={
              <Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "20vh",
                      fontSize: "18px",
                      color: "#666",
                    }}
                  >
                    Loading...
                  </div>
                }
              >
                <InputPhone />
              </Suspense>
            }
          ></Route>
          <Route
            path="/inputOTP"
            element={
              <Suspense
                fallback={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "20vh",
                      fontSize: "18px",
                      color: "#666",
                    }}
                  >
                    Loading...
                  </div>
                }
              >
                <InputOtp />
              </Suspense>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
