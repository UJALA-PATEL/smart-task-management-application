import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme") === "dark";
    setDarkMode(theme);
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/signup", { username, email, password });
      alert("Signup Successful!");
      navigate("/login");
    } catch (err) {
      console.log(err);
      alert("Signup Failed!");
    }
  };

  return (
    <div className={`auth-page d-flex justify-content-center align-items-center vh-100 ${darkMode ? 'dark-mode-bg' : ''}`}>
      <div className={`auth-card p-5 text-center ${darkMode ? 'dark-card' : ''}`}>
        <h1 className="fw-bold mb-3">Welcome to Smart Task Manager!</h1>
        <p className="text-muted mb-4">Create your account and get started</p>

        <form onSubmit={handleSignup}>
          <input
            className={`form-control mb-3 ${darkMode ? 'dark-input' : ''}`}
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            className={`form-control mb-3 ${darkMode ? 'dark-input' : ''}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className={`form-control mb-3 ${darkMode ? 'dark-input' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-success w-100 mb-3">
            Signup
          </button>
        </form>

        <p className="mt-4">
          Already have an account?{" "}
          <span className="text-primary fw-bold" style={{ cursor: "pointer" }} onClick={() => navigate("/login")}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;