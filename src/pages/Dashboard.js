import React, { useState, useEffect } from "react";
import API from "../api";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TaskChart from "../components/TaskChart";
import TaskForm from "../components/TaskForm";
import VoiceCommand from "../components/VoiceCommand";

import Analytics from "../components/Analytics";
import CalendarPage from "../components/CalendarPage";
import TeamPage from "../components/TeamPage";
import SettingsPage from "../components/SettingsPage";

function Dashboard({ darkMode, setDarkMode }) {
  const [tasks, setTasks] = useState([]);
  const [page, setPage] = useState("dashboard");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // RESPONSIVE FIX
  const [mobile, setMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () =>
      window.removeEventListener("resize", handleResize);
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const res = await API.get("/tasks");

      setTasks(res.data || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      await API.post("/tasks", task);
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);

      setTasks((prev) =>
        prev.filter((t) => t._id !== id)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await API.put(`/tasks/${id}`, data);

      setTasks((prev) =>
        prev.map((t) =>
          t._id === id ? res.data : t
        )
      );
    } catch (err) {
      console.log(err);
    }
  };

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === "todo") return task.status === "Todo";
      if (filter === "progress")
        return task.status === "In Progress";
      if (filter === "done") return task.status === "Done";

      return true;
    })
    .filter((task) =>
      task.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div
      style={{
        background: darkMode ? "#111827" : "#F5F7FB",
        color: darkMode ? "#fff" : "#111827",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <Sidebar setPage={setPage} />

      <div
        style={{
          marginLeft: mobile ? "0" : "260px",
          width: mobile
            ? "100%"
            : "calc(100% - 260px)",
          transition: "0.3s ease",
          overflowX: "hidden",
        }}
      >
        <Navbar
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <div
          style={{
            padding: mobile ? "15px" : "25px",
            marginTop: mobile ? "70px" : "0",
            maxWidth: "100%",
          }}
        >
          {page === "dashboard" && (
            <>
              <h2 className="mb-3">Dashboard</h2>

              <TaskChart tasks={tasks} />

              <VoiceCommand
                addTask={addTask}
                darkMode={darkMode}
              />
            </>
          )}

          {page === "tasks" && (
            <>
              <TaskForm addTask={addTask} />

              <TaskFilter
                filter={filter}
                setFilter={setFilter}
                search={search}
                setSearch={setSearch}
              />

              {loading ? (
                <h4>Loading...</h4>
              ) : (
                <TaskList
                  tasks={filteredTasks}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </>
          )}

          {page === "analytics" && (
            <Analytics tasks={tasks} />
          )}

          {page === "calendar" && (
            <CalendarPage tasks={tasks} />
          )}

          {page === "team" && (
            <TeamPage tasks={tasks} />
          )}

          {page === "settings" && (
            <SettingsPage
              darkMode={darkMode}
              setDarkMode={setDarkMode}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;