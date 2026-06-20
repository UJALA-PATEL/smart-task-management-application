import React from "react";

function Sidebar({ setPage }) {
  const menu = [
    { name: "Dashboard", icon: "🏠", page: "dashboard" },
    { name: "Tasks", icon: "📝", page: "tasks" },
    { name: "Analytics", icon: "📊", page: "analytics" },
    { name: "Calendar", icon: "📅", page: "calendar" },
    { name: "Team", icon: "👥", page: "team" },
    { name: "Settings", icon: "⚙️", page: "settings" },
  ];

  return (
    <div
      style={{
        width: "260px",
        height: "100vh",
        background: "#25224E",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        zIndex: 1000,
      }}
    >
      {/* LOGO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "40px",
          paddingTop: "10px",
        }}
      >
        <div
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "12px",
            background: "#5B5FEF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20px",
          }}
        >
          ✅
        </div>

        <div>
          <h5
            style={{
              margin: 0,
              fontWeight: "700",
            }}
          >
            SmartTask
          </h5>

          <small
            style={{
              color: "#B8B8D1",
            }}
          >
            Manager
          </small>
        </div>
      </div>

      {/* MENU */}
      <div style={{ flex: 1 }}>
        {menu.map((item, index) => (
          <button
            key={index}
            onClick={() => setPage(item.page)}
            style={{
              width: "100%",
              background: "transparent",
              border: "none",
              color: "#D6D6E7",
              padding: "14px 16px",
              borderRadius: "12px",
              marginBottom: "10px",
              textAlign: "left",
              cursor: "pointer",
              fontSize: "15px",
              transition: "0.3s",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#5B5FEF";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
              e.target.style.color = "#D6D6E7";
            }}
          >
            {item.icon} &nbsp; {item.name}
          </button>
        ))}
      </div>

      {/* PRO CARD */}
      <div
        style={{
          background: "rgba(255,255,255,0.08)",
          borderRadius: "18px",
          padding: "18px",
          textAlign: "center",
        }}
      >
        <h6
          style={{
            color: "#fff",
            marginBottom: "8px",
          }}
        >
          🚀 Boost Productivity
        </h6>

        <p
          style={{
            fontSize: "12px",
            color: "#B8B8D1",
            marginBottom: "12px",
          }}
        >
          Organize tasks and track progress efficiently.
        </p>

        <button
          style={{
            width: "100%",
            background: "#5B5FEF",
            border: "none",
            color: "#fff",
            padding: "10px",
            borderRadius: "10px",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Upgrade
        </button>
      </div>
    </div>
  );
}

export default Sidebar;