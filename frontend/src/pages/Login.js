import React, { useState } from "react";
import axios from "axios";

function Login({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log("Sending login request");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: username,
          password: password
        }
      );

      console.log("Response:", res.data);

      const token = res.data.token;

      localStorage.setItem("token", token);
      setToken(token);

      alert("Login successful!");

    } catch (err) {
      console.log("Error:", err);
      alert("Invalid username or password");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", marginTop: 100 }}>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 10, width: 300 }}>
        <h2>Admin Login</h2>

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;