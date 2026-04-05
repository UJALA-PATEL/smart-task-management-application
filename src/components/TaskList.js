import React from "react";

function TaskList({ tasks, deleteTask, toggleComplete, updateTask }) {

  const handleEdit = (task) => {
    const newTitle = prompt("Edit Task Title", task.title);
    const newDesc = prompt("Edit Description", task.description);
    const newPriority = prompt("Edit Priority (Low/Medium/High)", task.priority);
    const newDue = prompt("Edit Due Date (YYYY-MM-DD)", task.dueDate ? task.dueDate.slice(0,10) : "");
    const newPoints = prompt("Edit Points", task.points || 0);
    const newTags = prompt("Edit Tags (comma separated)", task.tags?.join(", ") || "");

    updateTask(task._id, {
      title: newTitle || task.title,
      description: newDesc || task.description,
      priority: newPriority || task.priority,
      dueDate: newDue || task.dueDate,
      points: Number(newPoints) || task.points,
      tags: newTags.split(",").map(t => t.trim())
    });
  };

  return (
    <div className="mt-4">
      <h3>Your Tasks</h3>
      {tasks.length === 0 ? (
        <h5 className="text-center text-muted mt-3">
          No tasks yet. Add your first task 🚀
        </h5>
      ) : (
        tasks.map((task) => (
          <div key={task._id} className="card p-3 mb-2">
            <h5 style={{ textDecoration: task.completed ? "line-through" : "none" }}>
              {task.title} ({task.points} pts)
            </h5>
            <p>{task.description}</p>
            {task.tags && task.tags.length > 0 && (
              <p>
                {task.tags.map((tag, idx) => (
                  <span key={idx} className="badge bg-secondary me-1">{tag}</span>
                ))}
              </p>
            )}
            <span className={`badge bg-${task.priority === "High" ? "danger" : task.priority === "Medium" ? "warning" : "success"}`}>
              {task.priority}
            </span>
            {task.dueDate && <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>}
            <div className="mt-2">
              <button className="btn btn-success me-2" onClick={() => toggleComplete(task._id, task.completed)}>
                {task.completed ? "Undo" : "Complete"}
              </button>
              <button className="btn btn-primary me-2" onClick={() => handleEdit(task)}>
                Edit
              </button>
              <button className="btn btn-danger" onClick={() => deleteTask(task._id)}>
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TaskList;