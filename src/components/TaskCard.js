import React from "react";

function TaskCard({ task, deleteTask, toggleComplete }) {

  const getPriorityColor = () => {
    if (task.priority === "High") return "danger";
    if (task.priority === "Medium") return "warning";
    return "success";
  };

  const checkDeadline = () => {

    if (!task.dueDate) return null;

    const today = new Date();
    const due = new Date(task.dueDate);

    const diff = (due - today) / (1000 * 60 * 60 * 24);

    if (diff < 1 && diff >= 0) {
      return "⚠ Due Today";
    }

    if (diff < 2 && diff >= 1) {
      return "⚠ Due Tomorrow";
    }

    if (diff < 0) {
      return "❌ Overdue";
    }

    return null;
  };

  return (
    <div className="card p-3 mb-2">

      <h5
        style={{
          textDecoration: task.completed ? "line-through" : "none"
        }}
      >
        {task.title}
      </h5>

      <span className={`badge bg-${getPriorityColor()} mb-2`}>
        {task.priority}
      </span>

      {task.dueDate && (
        <p>Due: {task.dueDate}</p>
      )}

      {checkDeadline() && (
        <p style={{ color: "red", fontWeight: "bold" }}>
          {checkDeadline()}
        </p>
      )}

      <div>

        <button
          className="btn btn-success me-2"
          onClick={() => toggleComplete(task.id)}
        >
          Complete
        </button>

        <button
          className="btn btn-danger"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>

      </div>

    </div>
  );
}

export default TaskCard;