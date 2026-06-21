import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auth/signup", {
        username,
        email,
        password,
      });

      console.log("SIGNUP RESPONSE:", res.data);

      alert("Signup Successful!");
      navigate("/login");

    } catch (err) {
      console.log("SIGNUP ERROR:", err);

      alert(
        err.response?.data?.message ||
        "Signup Failed (Check backend connection)"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="p-5 bg-white rounded shadow" style={{ minWidth: "350px" }}>
        <h2 className="mb-3 text-center">Signup</h2>

        <form onSubmit={handleSignup}>
          <input
            className="form-control mb-3"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="email"
            className="form-control mb-3"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Creating Account..." : "Signup"}
          </button>
        </form>

        <p className="mt-3 text-center">
          Already have account?{" "}
          <span
            style={{ cursor: "pointer", color: "blue" }}
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;