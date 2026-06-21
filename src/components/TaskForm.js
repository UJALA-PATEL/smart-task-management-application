import React, { useState } from "react";

function TaskForm({ addTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [assignedEmail, setAssignedEmail] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleSubmit = (e) => {
    e.preventDefault();

    addTask({
      title,
      description,
      dueDate,
      assignedEmail,
      priority,
    });

    setTitle("");
    setDescription("");
    setDueDate("");
    setAssignedEmail("");
    setPriority("Low");

    alert("✅ Task Created!");
  };

  return (
    <div
      className="card shadow-sm border-0 mb-4"
      style={{
        borderRadius: "16px",
      }}
    >
      <div className="card-body">
        <h4 className="mb-3 fw-bold">
          ➕ Add Task
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <textarea
              className="form-control"
              rows="3"
              placeholder="Task Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="row g-3 mb-3">
            <div className="col-12 col-md-6">
              <input
                type="date"
                className="form-control"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
            </div>

            <div className="col-12 col-md-6">
              <select
                className="form-control"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          <div className="mb-3">
            <input
              className="form-control"
              placeholder="Assign to (email)"
              value={assignedEmail}
              onChange={(e) => setAssignedEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{
              borderRadius: "10px",
              padding: "10px",
              fontWeight: "600",
            }}
          >
            Add Task
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskForm;