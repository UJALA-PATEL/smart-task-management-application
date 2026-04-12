import React, { useState, useEffect } from "react";
import axios from "axios";
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

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    const res = await axios.post(`${API}/api/tasks`, task, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks([...tasks, res.data]);
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/api/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.filter(t => t._id !== id));
  };

  const updateTask = async (id, data) => {
    const res = await axios.put(`${API}/api/tasks/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(tasks.map(t => t._id === id ? res.data : t));
  };

  const filteredTasks = tasks
    .filter(task => {
      if (filter === "todo") return task.status === "Todo";
      if (filter === "progress") return task.status === "In Progress";
      if (filter === "done") return task.status === "Done";
      return true;
    })
    .filter(task =>
      task.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={{ display: "flex" }}>

      <Sidebar setPage={setPage} />

      <div style={{ marginLeft: "240px", width: "100%" }}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="container mt-4">

          {page === "dashboard" && (
            <>
              <TaskChart tasks={tasks} />
              <VoiceCommand addTask={addTask} />
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
                <h5>Loading...</h5>
              ) : (
                <TaskList
                  tasks={filteredTasks}
                  deleteTask={deleteTask}
                  updateTask={updateTask}
                />
              )}
            </>
          )}

          {page === "analytics" && <Analytics tasks={tasks} />}
          {page === "calendar" && <CalendarPage tasks={tasks} />}
          {page === "team" && <TeamPage tasks={tasks} />}
          {page === "settings" && (
            <SettingsPage darkMode={darkMode} setDarkMode={setDarkMode} />
          )}

        </div>
      </div>
    </div>
  );
}

export default Dashboard;