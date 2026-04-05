import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState("");
  const [points, setPoints] = useState(0);
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      title,
      description,
      priority,
      dueDate,
      points: Number(points),
      tags: tags.split(",").map(t => t.trim()),
      completed: false
    });

    setTitle("");
    setDescription("");
    setPriority("Low");
    setDueDate("");
    setPoints(0);
    setTags("");
  };

  return (
    <div className="card p-3 mb-4">
      <h4>Add Task</h4>
      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-2"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="form-control mb-2"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="form-control mb-2"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <input
          type="date"
          className="form-control mb-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Points"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
        <input
          className="form-control mb-2"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <button className="btn btn-primary w-100">Add Task</button>
      </form>
    </div>
  );
}

export default TaskForm;