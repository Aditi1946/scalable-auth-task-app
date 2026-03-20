import { useState } from "react";
import axios from "axios";

const inputStyle = {
  width: "90%",
  padding: "10px",
  margin: "10px 0",
  borderRadius: "6px",
  border: "1px solid #ddd"
};

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:5000/api/v1/auth/register", {
        name,
        email,
        password
      });
      setMessage("Registered successfully! Now login.");
    } catch {
      setMessage("Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input style={inputStyle} placeholder="Name" onChange={e => setName(e.target.value)} />
      <input style={inputStyle} placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input style={inputStyle} placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

      <button style={btnStyle} onClick={handleRegister}>
        Register
      </button>

      {message && <p>{message}</p>}
    </div>
  );
}

const btnStyle = {
  padding: "10px",
  margin: "10px",
  width: "90%",
  border: "none",
  borderRadius: "6px",
  backgroundColor: "#764ba2",
  color: "#fff",
  fontWeight: "bold",
  cursor: "pointer"
};

export default Register;