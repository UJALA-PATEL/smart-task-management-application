import React, { useState, useEffect } from "react";
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

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
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

  // Add Task
  const addTask = async (task) => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", task, {
        headers: { Authorization: token }
      });
      setTasks([...tasks, res.data]);
    } catch (err) { console.error(err); }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token }
      });
      setTasks(tasks.filter(t => t._id !== id));
    } catch (err) { console.error(err); }
  };

  // Toggle Complete
  const toggleComplete = async (id, completed) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { completed: !completed },
        { headers: { Authorization: token } }
      );
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) { console.error(err); }
  };

  // Update Task (Edit)
  const updateTask = async (id, data) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        data,
        { headers: { Authorization: token } }
      );
      setTasks(tasks.map(t => t._id === id ? res.data : t));
    } catch (err) { console.error(err); }
  };

  // Filter + Search tasks
  const filteredTasks = tasks
    .filter(task => {
      if (filter === "completed") return task.completed;
      if (filter === "pending") return !task.completed;
      if (filter === "high") return task.priority === "High";
      return true;
    })
    .filter(task => task.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <Navbar />
      <div className="container mt-4">
        <TaskForm addTask={addTask} />
        <TaskChart tasks={filteredTasks} />
        <VoiceCommand addTask={addTask} />
        <TaskFilter filter={filter} setFilter={setFilter} search={search} setSearch={setSearch} />
        {loading ? <h3>Loading...</h3> :
          <TaskList
            tasks={filteredTasks}
            deleteTask={deleteTask}
            toggleComplete={toggleComplete}
            updateTask={updateTask}
          />
        }
      </div>
    </div>
  );
}

export default Dashboard;