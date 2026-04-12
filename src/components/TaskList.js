import React from "react";
import { motion } from "framer-motion";

function TaskList({ tasks, deleteTask, updateTask }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const getStatusColor = (status) => {
    if (status === "Todo") return "#bcdcf7";
    if (status === "In Progress") return "#ede6d3";
    if (status === "Done") return "#59f5ac";
    return "#545252";
  };

  // 🔥 PRIORITY COLOR
  const getPriorityColor = (priority) => {
    if (priority === "High") return "danger";
    if (priority === "Medium") return "warning";
    return "success";
  };

  return (
    <div className="mt-4">
      <h3 className="mb-3">📝 Your Tasks</h3>

      {tasks.length === 0 ? (
        <div className="text-center mt-5">
          <h5>😎 No tasks yet! Start adding one 🚀</h5>
        </div>
      ) : (
        <div className="row">
          {tasks.map((task) => {

            const isCreator = task.createdBy?._id === user._id;
            const isAssignee = task.assignedTo?._id === user._id;

            return (
              <div className="col-md-6 col-lg-4" key={task._id}>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ scale: 1.05 }}
                  className="card p-3 mb-4 shadow"
                  style={{
                    borderLeft: `6px solid ${getStatusColor(task.status)}`,
                    boxShadow: "0 6px 25px rgba(0,0,0,0.25)",
                    transition: "0.3s"
                  }}
                >

                  {/* TITLE */}
                  <h5 className="fw-bold mb-2">
                    {task.title}
                  </h5>

                  {/* 🔥 PRIORITY BADGE */}
                  <span className={`badge bg-${getPriorityColor(task.priority)} mb-2`}>
                    🔥 {task.priority || "Low"} Priority
                  </span>

                  {/* DESCRIPTION */}
                  <p style={{ fontSize: "14px", opacity: 0.8 }}>
                    {task.description || "No description"}
                  </p>

                  {/* ROLE TAG */}
                  {isCreator && (
                    <span className="badge bg-success mb-2">
                      🟢 Created by you
                    </span>
                  )}

                  {isAssignee && !isCreator && (
                    <span className="badge bg-primary mb-2">
                      🔵 Assigned to you
                    </span>
                  )}

                  {/* ASSIGN INFO */}
                  {isCreator && task.assignedTo && (
                    <p style={{ fontSize: "13px" }}>
                      👤 Assigned to: {task.assignedTo.email}
                    </p>
                  )}

                  {isAssignee && task.createdBy && (
                    <p style={{ fontSize: "13px" }}>
                      👤 Assigned by: {task.createdBy.email}
                    </p>
                  )}

                  {/* STATUS */}
                  <div className="mb-2">
                    <span
                      style={{
                        padding: "5px 10px",
                        borderRadius: "10px",
                        background: getStatusColor(task.status),
                        color: "black",
                        fontSize: "12px",
                        fontWeight: "600"
                      }}
                    >
                      {task.status}
                    </span>
                  </div>

                  {/* DUE DATE */}
                  {task.dueDate && (
                    <p style={{ fontSize: "13px" }}>
                      📅 {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}

                  {/* ACTIONS */}
                  <div className="mt-2">

                    {/* ASSIGNEE → STATUS CHANGE */}
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

                    {/* CREATOR → EDIT + DELETE */}
                    {isCreator && (
                      <>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => {
                            const newDate = prompt("Enter new due date (YYYY-MM-DD)");
                            if (newDate) {
                              updateTask(task._id, { dueDate: newDate });
                            }
                          }}
                        >
                          ✏ Edit Date
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => deleteTask(task._id)}
                        >
                          🗑 Delete
                        </button>
                      </>
                    )}

                  </div>

                </motion.div>

              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default TaskList;