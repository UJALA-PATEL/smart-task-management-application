import React from "react";

function Navbar({ darkMode, setDarkMode }) {
const user = JSON.parse(localStorage.getItem("user"));

const logout = () => {
localStorage.clear();
window.location.href = "/login";
};

return (
<div
style={{
height: "80px",
background: darkMode ? "#1F2937" : "#ffffff",
borderBottom: darkMode
? "1px solid #374151"
: "1px solid #E5E7EB",
display: "flex",
justifyContent: "space-between",
alignItems: "center",
padding: "0 30px",
position: "sticky",
top: 0,
zIndex: 999,
}}
>
{/* LEFT */} <div>
<h3
style={{
margin: 0,
fontWeight: "700",
color: darkMode ? "#ffffff" : "#111827",
}}
>
Welcome Back 👋 </h3>

```
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
      alignItems: "center",
      gap: "15px",
    }}
  >
    {/* SEARCH */}
    <div
      style={{
        background: darkMode ? "#374151" : "#F3F4F6",
        padding: "10px 15px",
        borderRadius: "12px",
        width: "280px",
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

    {/* DARK MODE BUTTON */}
    <button
      onClick={() => setDarkMode(!darkMode)}
      style={{
        border: "none",
        background: "#5B5FEF",
        color: "#fff",
        padding: "10px 16px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "600",
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
        padding: "8px 12px",
        borderRadius: "14px",
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
          fontSize: "18px",
        }}
      >
        {user?.username?.charAt(0)?.toUpperCase()}
      </div>

      <div>
        <div
          style={{
            fontWeight: "600",
            fontSize: "14px",
            color: darkMode ? "#ffffff" : "#111827",
          }}
        >
          {user?.username}
        </div>

        <small
          style={{
            color: darkMode ? "#D1D5DB" : "#6B7280",
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
        padding: "10px 16px",
        borderRadius: "12px",
        cursor: "pointer",
        fontWeight: "600",
      }}
    >
      Logout
    </button>
  </div>
</div>
);
}

export default Navbar;
