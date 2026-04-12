import React from "react";

function Navbar({ darkMode, setDarkMode }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav
      className="px-3 d-flex justify-content-end align-items-center"
      style={{
        height: "70px",
        background: darkMode ? "#0f172a" : "#021333"
      }}
    >
      <span className="text-white me-3">
        👤 {user?.email}
      </span>

      <button
        className="btn btn-light me-2"
        onClick={() => setDarkMode(prev => !prev)}
      >
        {darkMode ? "☀ Light" : "🌙 Dark"}
      </button>

      <button className="btn btn-danger" onClick={logout}>
        Logout
      </button>
    </nav>
  );
}

export default Navbar;