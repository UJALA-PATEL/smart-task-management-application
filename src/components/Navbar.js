import React, { useState, useEffect } from "react";

function Navbar({ darkMode, setDarkMode }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [mobile, setMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        background: darkMode ? "#1F2937" : "#ffffff",
        borderBottom: darkMode
          ? "1px solid #374151"
          : "1px solid #E5E7EB",
        padding: mobile ? "70px 15px 15px" : "15px 30px",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: mobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: mobile ? "stretch" : "center",
          gap: "15px",
        }}
      >
        {/* LEFT */}
        <div>
          <h3
            style={{
              margin: 0,
              fontWeight: "700",
              color: darkMode ? "#ffffff" : "#111827",
              fontSize: mobile ? "20px" : "28px",
            }}
          >
            Welcome Back 👋
          </h3>

          <small
            style={{
              color: darkMode ? "#D1D5DB" : "#6B7280",
            }}
          >
            Manage your tasks efficiently
          </small>
        </div>

        {/* RIGHT */}
        <div
          style={{
            display: "flex",
            flexDirection: mobile ? "column" : "row",
            alignItems: mobile ? "stretch" : "center",
            gap: "10px",
          }}
        >
          {/* SEARCH */}
          <div
            style={{
              background: darkMode ? "#374151" : "#F3F4F6",
              padding: "10px 15px",
              borderRadius: "12px",
              width: mobile ? "100%" : "280px",
            }}
          >
            <input
              type="text"
              placeholder="Search tasks..."
              style={{
                width: "100%",
                border: "none",
                outline: "none",
                background: "transparent",
                color: darkMode ? "#ffffff" : "#111827",
              }}
            />
          </div>

          {/* DARK MODE */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              border: "none",
              background: "#5B5FEF",
              color: "#fff",
              padding: "10px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              width: mobile ? "100%" : "auto",
            }}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>

          {/* USER */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              background: darkMode ? "#374151" : "#F9FAFB",
              padding: "10px",
              borderRadius: "14px",
              width: mobile ? "100%" : "auto",
            }}
          >
            <div
              style={{
                width: "42px",
                height: "42px",
                borderRadius: "50%",
                background: "#5B5FEF",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "700",
              }}
            >
              {user?.username?.charAt(0)?.toUpperCase()}
            </div>

            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontWeight: "600",
                  color: darkMode ? "#ffffff" : "#111827",
                }}
              >
                {user?.username}
              </div>

              <small
                style={{
                  color: darkMode ? "#D1D5DB" : "#6B7280",
                  wordBreak: "break-word",
                }}
              >
                {user?.email}
              </small>
            </div>
          </div>

          {/* LOGOUT */}
          <button
            onClick={logout}
            style={{
              border: "none",
              background: "#EF4444",
              color: "#fff",
              padding: "10px",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              width: mobile ? "100%" : "auto",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;