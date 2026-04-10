import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/api/auth/login`, {
        email,
        password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      alert("Login Failed");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-4 bg-white shadow rounded" style={{ width: "300px" }}>
        <h3 className="text-center mb-3">Login</h3>

        <form onSubmit={handleLogin}>
          <input
            className="form-control mb-2"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            className="form-control mb-2"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn btn-primary w-100">Login</button>
        </form>

        <p className="text-center mt-2">
          No account?{" "}
          <span style={{ color: "blue", cursor: "pointer" }} onClick={() => navigate("/signup")}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;