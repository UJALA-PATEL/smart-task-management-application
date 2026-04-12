import React from "react";

function Sidebar({ setPage }) {

  const menu = [
    { name: "Dashboard", icon: "📊", page: "dashboard" },
    { name: "Tasks", icon: "📝", page: "tasks" },
    { name: "Analytics", icon: "📈", page: "analytics" },
    { name: "Calendar", icon: "📅", page: "calendar" },
    { name: "Team", icon: "👥", page: "team" },
    { name: "Settings", icon: "⚙", page: "settings" }
  ];

  return (
    <div
      style={{
        width: "240px",
        height: "100vh",
        background: "linear-gradient(180deg, #0f172a, #1e293b)",
        color: "white",
        padding: "20px",
        position: "fixed",
        left: 0,
        top: 0,
        zIndex: 1000
      }}
    >

      {/* 🔥 LOGO */}
      <h4 className="mb-4 fw-bold text-center">
        🚀 Smart Manager
      </h4>

      {/* 🔥 MENU */}
      {menu.map((item, index) => (
        <button
          key={index}
          onClick={() => setPage(item.page)}
          className="btn w-100 mb-3 text-start"
          style={{
            background: "transparent",
            color: "white",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "10px",
            padding: "10px",
            transition: "0.3s"
          }}
          onMouseEnter={(e) => {
            e.target.style.background = "#2563eb";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "transparent";
          }}
        >
          {item.icon} {item.name}
        </button>
      ))}

      {/* 🔥 BOTTOM CARD (PRO FEATURE) */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          left: "20px",
          right: "20px",
          padding: "15px",
          background: "rgba(255,255,255,0.05)",
          borderRadius: "10px",
          textAlign: "center"
        }}
      >
        <p style={{ fontSize: "12px", marginBottom: "5px" }}>
          ⚡ Upgrade your productivity
        </p>
        <button className="btn btn-primary btn-sm w-100">
          Upgrade
        </button>
      </div>

    </div>
  );
}

export default Sidebar;