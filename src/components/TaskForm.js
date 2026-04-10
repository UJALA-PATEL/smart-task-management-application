import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedEmail, setAssignedEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask({
      title,
      description,
      dueDate,
      assignedEmail
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setAssignedEmail("");

    alert("✅ Task Created!");
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

        <input
          type="date"
          className="form-control mb-2"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />

        <input
          className="form-control mb-2"
          placeholder="Assign to (email)"
          value={assignedEmail}
          onChange={(e) => setAssignedEmail(e.target.value)}
        />

        <button className="btn btn-primary w-100">
          Add Task
        </button>

      </form>
    </div>
  );
}

export default TaskForm;