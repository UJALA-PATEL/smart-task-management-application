import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "../api";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API}/api/auth/signup`, {
        username,
        email,
        password
      });

      alert("Signup Successful!");
      navigate("/login");
    } catch (err) {
      alert("Signup Failed!");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-5 bg-white rounded shadow" style={{ minWidth: "350px" }}>
        <h2 className="mb-3 text-center">Signup</h2>

        <form onSubmit={handleSignup}>
          <input className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)} required />

          <input type="email" className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required />

          <input type="password" className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required />

          <button className="btn btn-success w-100">Signup</button>
        </form>

        <p className="mt-3 text-center">
          Already have account?{" "}
          <span style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;