import { useState } from "react";
import axios from "axios";

const inputStyle = {
  width: "90%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ddd"
};

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/auth/login", {
        email,
        password
      });
      setToken(res.data.token);
      setError("");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div>
      <h2>Login</h2>

      <input
        style={inputStyle}
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        style={inputStyle}
        placeholder="Password"
        type="password"
        onChange={e => setPassword(e.target.value)}
      />

      <button style={btnStyle} onClick={handleLogin}>
        Login
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
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

export default Login;