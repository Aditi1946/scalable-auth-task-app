import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
  const [token, setToken] = useState("");
  const [page, setPage] = useState("login");

  if (token) return <Dashboard token={token} />;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #667eea, #764ba2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          width: "350px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          textAlign: "center"
        }}
      >
        <h1 style={{ color: "#333" }}>Task Manager</h1>
        <p style={{ color: "#777" }}>
          Manage your tasks efficiently 🚀
        </p>

        <button
          onClick={() => setPage("login")}
          style={btnStyle}
        >
          Login
        </button>

        <button
          onClick={() => setPage("register")}
          style={{ ...btnStyle, backgroundColor: "#764ba2" }}
        >
          Register
        </button>

        {page === "login" && <Login setToken={setToken} />}
        {page === "register" && <Register />}
      </div>
    </div>
  );
}

const btnStyle = {
  padding: "10px",
  margin: "10px",
  width: "90%",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#667eea",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

export default App;