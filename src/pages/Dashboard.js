import React, { useState, useEffect } from "react";
import API from "../api";
import axios from "axios";

import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilter from "../components/TaskFilter";
import TaskChart from "../components/TaskChart";
import VoiceCommand from "../components/VoiceCommand";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/api/tasks`, {
  headers: { Authorization: token }
});
      setTasks(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const res = await axios.post(`${API}/api/tasks`, task, {
  headers: { Authorization: token }
});
      setTasks([...tasks, res.data]);
      alert("✅ Task added successfully!");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/api/tasks/${id}`, {
  headers: { Authorization: token }
});
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const updateTask = async (id, data) => {
    try {
      const res = await axios.put(`${API}/api/tasks/${id}`, data, {
  headers: { Authorization: token }
});
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) {
      console.error(err);
    }
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
    <div>
      <Navbar />

      <div className="container mt-4">
        <TaskForm addTask={addTask} />

        <TaskChart tasks={filteredTasks} />

        <VoiceCommand addTask={addTask} />

        <TaskFilter
          filter={filter}
          setFilter={setFilter}
          search={search}
          setSearch={setSearch}
        />

        {loading ? (
          <div className="text-center mt-5">
            <h4>⏳ Loading tasks...</h4>
          </div>
        ) : filteredTasks.length === 0 ? (
          <div className="text-center mt-5">
            <h5>🚀 No tasks yet. Start by adding one!</h5>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            updateTask={updateTask}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;