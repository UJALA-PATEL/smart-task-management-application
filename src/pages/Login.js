import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const theme = localStorage.getItem("theme") === "dark";
    setDarkMode(theme);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Login Failed!");
    }
  };

  return (
    <div className={`d-flex justify-content-center align-items-center vh-100 ${darkMode ? 'bg-dark' : 'bg-light'}`}>
      <div className={`p-5 rounded shadow ${darkMode ? 'bg-secondary text-white' : 'bg-white text-dark'}`} style={{ minWidth: "350px" }}>
        <h2 className="mb-3 text-center">Welcome Back!</h2>
        <p className="text-center text-muted mb-4">Login to your Smart Task Manager account</p>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            className={`form-control mb-3 ${darkMode ? 'bg-dark text-white' : ''}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            className={`form-control mb-3 ${darkMode ? 'bg-dark text-white' : ''}`}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
        </form>

        <p className="text-center mt-3">
          Don't have an account?{" "}
          <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => navigate("/signup")}>
            Signup
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;