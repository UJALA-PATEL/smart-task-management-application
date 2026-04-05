import React, { useState, useEffect } from "react";

function Navbar() {

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }

    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // 🔥 LOGOUT FUNCTION
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3 d-flex justify-content-between">

      <span className="navbar-brand">
        Smart Task Manager
      </span>

      <div>
        <button
          className="btn btn-light me-2"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? "☀ Light" : "🌙 Dark"}
        </button>

        <button
          className="btn btn-danger"
          onClick={logout}
        >
          Logout
        </button>
      </div>

    </nav>
  );
}

export default Navbar;