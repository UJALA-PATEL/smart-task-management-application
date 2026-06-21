import React, { useState, useEffect } from "react";

function Sidebar({ setPage }) {
  const [mobile, setMobile] = useState(window.innerWidth <= 768);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth <= 768;
      setMobile(isMobile);

      if (!isMobile) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menu = [
    { name: "Dashboard", icon: "🏠", page: "dashboard" },
    { name: "Tasks", icon: "📝", page: "tasks" },
    { name: "Analytics", icon: "📊", page: "analytics" },
    { name: "Calendar", icon: "📅", page: "calendar" },
    { name: "Team", icon: "👥", page: "team" },
    { name: "Settings", icon: "⚙️", page: "settings" },
  ];

  return (
    <>
      {/* MOBILE MENU BUTTON */}
      {mobile && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            top: "15px",
            left: "15px",
            zIndex: 3000,
            border: "none",
            background: "#5B5FEF",
            color: "#fff",
            padding: "10px 14px",
            borderRadius: "10px",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          ☰
        </button>
      )}

      {/* BACKDROP */}
      {mobile && open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 1999,
          }}
        />
      )}

      {/* SIDEBAR */}
      <div
        style={{
          width: "260px",
          height: "100vh",
          background: "#25224E",
          color: "#fff",
          position: "fixed",
          left: mobile ? (open ? "0" : "-270px") : "0",
          top: 0,
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          zIndex: 2000,
          transition: "all 0.3s ease",
          overflowY: "auto",
          boxShadow: mobile && open ? "4px 0 20px rgba(0,0,0,0.3)" : "none",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "40px",
            paddingTop: mobile ? "50px" : "10px",
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
            }}
          >
            ✅
          </div>

          <div>
            <h5 style={{ margin: 0 }}>SmartTask</h5>
            <small style={{ color: "#B8B8D1" }}>Manager</small>
          </div>
        </div>

        {/* MENU */}
        <div style={{ flex: 1 }}>
          {menu.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                setPage(item.page);
                if (mobile) setOpen(false);
              }}
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
                transition: "0.2s",
              }}
            >
              {item.icon} &nbsp; {item.name}
            </button>
          ))}
        </div>

        {/* FOOTER CARD */}
        <div
          style={{
            background: "rgba(255,255,255,0.08)",
            borderRadius: "18px",
            padding: "18px",
            textAlign: "center",
            marginTop: "15px",
          }}
        >
          <h6>🚀 Boost Productivity</h6>

          <p
            style={{
              fontSize: "12px",
              color: "#B8B8D1",
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
              cursor: "pointer",
            }}
          >
            Upgrade
          </button>
        </div>
      </div>
    </>
  );
}

export default Sidebar;