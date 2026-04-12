import React, { useEffect, useState } from "react";

function SettingsPage() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // 🔥 GLOBAL SYNC FIX
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div
      className="container py-4"
      style={{
        maxWidth: "820px"
      }}
    >

      {/* HEADER */}
      <div className="mb-4">
        <h2 className="fw-bold">Settings</h2>
        <p className="text-muted" style={{ fontSize: "13px" }}>
          Manage your account preferences and appearance
        </p>
      </div>

      {/* MAIN PANEL */}
      <div
        className="card border-0 shadow-sm"
        style={{
          borderRadius: "14px",
          overflow: "hidden"
        }}
      >

        {/* TOP PROFILE STRIP */}
        <div
          style={{
            padding: "22px",
            background: "#0f172a",
            color: "white",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>

            <div
              style={{
                width: "46px",
                height: "46px",
                borderRadius: "12px",
                background: "white",
                color: "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "700"
              }}
            >
              {user?.username?.charAt(0).toUpperCase()}
            </div>

            <div>
              <div style={{ fontWeight: "600" }}>{user?.username}</div>
              <div style={{ fontSize: "12px", opacity: 0.7 }}>
                {user?.email}
              </div>
            </div>

          </div>

          <span
            style={{
              fontSize: "12px",
              padding: "6px 10px",
              borderRadius: "20px",
              background: "rgba(255,255,255,0.12)"
            }}
          >
            ACTIVE
          </span>

        </div>

        {/* BODY */}
        <div style={{ padding: "22px" }}>

          {/* SECTION TITLE */}
          <div style={{ marginBottom: "18px" }}>
            <div style={{ fontWeight: "600", fontSize: "14px" }}>
              Appearance
            </div>
            <div style={{ fontSize: "12px", color: "#6b7280" }}>
              Customize how the app looks
            </div>
          </div>

          {/* THEME ROW */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "14px 0",
              borderBottom: "1px solid #eee"
            }}
          >

            <div>
              <div style={{ fontWeight: "500" }}>Theme Mode</div>
              <div style={{ fontSize: "12px", color: "#6b7280" }}>
                Switch between light and dark interface
              </div>
            </div>

            <button
              onClick={toggleTheme}
              style={{
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid #ddd",
                background: darkMode ? "#111827" : "#fff",
                color: darkMode ? "#fff" : "#111827",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: "500",
                transition: "0.2s"
              }}
            >
              {darkMode ? "🌙 Dark" : "☀ Light"}
            </button>

          </div>

          {/* ACCOUNT SECTION */}
          <div style={{ marginTop: "18px" }}>

            <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "10px" }}>
              Account Information
            </div>

            <div style={{ fontSize: "13px" }}>

              <div style={rowStyle}>
                <span style={labelStyle}>Username</span>
                <span style={valueStyle}>{user?.username}</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>Email</span>
                <span style={valueStyle}>{user?.email}</span>
              </div>

              <div style={rowStyle}>
                <span style={labelStyle}>User ID</span>
                <span style={{ ...valueStyle, fontSize: "11px" }}>
                  {user?._id}
                </span>
              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

// 🔥 SMALL CLEAN STYLES
const rowStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #f3f4f6"
};

const labelStyle = {
  color: "#6b7280"
};

const valueStyle = {
  fontWeight: "500"
};

export default SettingsPage;