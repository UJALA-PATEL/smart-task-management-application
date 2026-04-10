import React from "react";

function TaskList({ tasks, deleteTask, updateTask }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const getStatusColor = (status) => {
    if (status === "Todo") return "secondary";
    if (status === "In Progress") return "warning";
    if (status === "Done") return "success";
    return "light";
  };

  return (
    <div className="mt-4">
      <h3>Your Tasks</h3>

      {tasks.length === 0 ? (
        <h5>No tasks</h5>
      ) : (
        tasks.map((task) => {

          const isCreator = task.createdBy?._id === user._id;
          const isAssignee = task.assignedTo?._id === user._id;

          return (
            <div key={task._id} className="card p-3 mb-3">

              <h5 className="fw-bold">{task.title}</h5>

              <p>{task.description}</p>

              {/* 🔥 ROLE LOGIC */}
              {isCreator && (
                <p className="text-success">
                  🟢 You created this task
                </p>
              )}

              {isAssignee && !isCreator && (
                <p className="text-primary">
                  🔵 Assigned to you
                </p>
              )}

              {/* 🔥 ASSIGN INFO */}
              {isCreator && task.assignedTo && (
                <p>
                  👤 Assigned to: {task.assignedTo.email}
                </p>
              )}

              {isAssignee && task.createdBy && (
                <p>
                  👤 Assigned by: {task.createdBy.email}
                </p>
              )}

              {/* STATUS */}
              <span className={`badge bg-${getStatusColor(task.status)} mb-2`}>
                {task.status}
              </span>

              {/* DUE DATE */}
              {task.dueDate && (
                <p>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</p>
              )}

              {/* STATUS CHANGE (ONLY ASSIGNEE) */}
              {isAssignee && (
                <select
                  className="form-control mb-2"
                  value={task.status}
                  onChange={(e) =>
                    updateTask(task._id, { status: e.target.value })
                  }
                >
                  <option>Todo</option>
                  <option>In Progress</option>
                  <option>Done</option>
                </select>
              )}

              {/* DUE DATE CHANGE (ONLY CREATOR) */}
              {isCreator && (
                <button
                  className="btn btn-warning me-2"
                  onClick={() => {
                    const newDate = prompt("Enter new due date (YYYY-MM-DD)");
                    if (newDate) {
                      updateTask(task._id, { dueDate: newDate });
                    }
                  }}
                >
                  Change Due Date
                </button>
              )}

              {/* DELETE */}
              {isCreator && (
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTask(task._id)}
                >
                  Delete
                </button>
              )}

            </div>
          );
        })
      )}
    </div>
  );
}

export default TaskList;