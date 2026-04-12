import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

// ✅ FIX (IMPORTANT)
ChartJS.register(ArcElement, Tooltip, Legend);

function TaskChart({ tasks }) {

  const [view, setView] = useState("me");

  if (!tasks || tasks.length === 0) return null;

  const user = JSON.parse(localStorage.getItem("user"));

  const createdTasks = tasks.filter(t => t.createdBy?._id === user._id);

  const assignedByMe = tasks.filter(
    t => t.createdBy?._id === user._id && t.assignedTo && t.assignedTo._id !== user._id
  );

  const myTasks = tasks.filter(
    t => t.assignedTo?._id === user._id
  );

  const completedByMe = myTasks.filter(t => t.status === "Done");
  const completedByOthers = assignedByMe.filter(t => t.status === "Done");

  const myTodo = myTasks.filter(t => t.status === "Todo").length;
  const myProgress = myTasks.filter(t => t.status === "In Progress").length;
  const myDone = myTasks.filter(t => t.status === "Done").length;

  // ✅ SAFE DATA (fix for empty chart bug)
  const chartDataValues =
    myTodo + myProgress + myDone === 0
      ? [1, 0, 0]
      : [myTodo, myProgress, myDone];

  const data = {
    labels: ["Todo", "In Progress", "Done"],
    datasets: [
      {
        data: chartDataValues,
        backgroundColor: ["#6366f1", "#f59e0b", "#22c55e"],
        borderWidth: 1
      }
    ]
  };

  // ✅ OPTIONS (VERY IMPORTANT)
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  return (
    <div className="mt-5">

      {/* HEADER */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">📊 Overview</h4>
      </div>

      {/* CARDS */}
      <div className="row mb-3">

        <div className="col-md-3">
          <div className="p-3 rounded shadow-sm bg-light text-center">
            <h6>Created</h6>
            <h3>{createdTasks.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 rounded shadow-sm bg-info text-white text-center">
            <h6>Assigned</h6>
            <h3>{assignedByMe.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 rounded shadow-sm bg-warning text-center">
            <h6>My Tasks</h6>
            <h3>{myTasks.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="p-3 rounded shadow-sm bg-success text-white text-center">
            <h6>Done</h6>
            <h3>{completedByMe.length + completedByOthers.length}</h3>
          </div>
        </div>

      </div>

      {/* 🔥 FIXED PIE CHART */}
      <div className="card p-3 shadow-sm mb-3 text-center">
        <h6 className="mb-2">My Task Status</h6>

        {/* ✅ HEIGHT FIX (MOST IMPORTANT) */}
        <div style={{ height: "200px", width: "200px", margin: "auto" }}>
          <Pie data={data} options={options} />
        </div>
      </div>

      {/* BUTTONS */}
      <div className="d-flex gap-2 mb-3">
        <button
          className={`btn ${view === "me" ? "btn-primary" : "btn-outline-primary"}`}
          onClick={() => setView("me")}
        >
          Completed by Me
        </button>

        <button
          className={`btn ${view === "others" ? "btn-success" : "btn-outline-success"}`}
          onClick={() => setView("others")}
        >
          Completed by Assigned User
        </button>
      </div>

      {/* OUTPUT */}
      <div className="card p-3 shadow-sm">

        {view === "me" ? (
          <>
            <h6>✅ Tasks Completed by You</h6>

            {completedByMe.length === 0 ? (
              <p>No tasks completed by you</p>
            ) : (
              completedByMe.map((t) => (
                <p key={t._id}>✔ {t.title}</p>
              ))
            )}
          </>
        ) : (
          <>
            <h6>👥 Tasks Completed by Assigned Users</h6>

            {completedByOthers.length === 0 ? (
              <p>No tasks completed by others</p>
            ) : (
              completedByOthers.map((t) => (
                <p key={t._id}>
                  👤 <b>{t.assignedTo?.email}</b> completed "{t.title}"
                </p>
              ))
            )}
          </>
        )}

      </div>

    </div>
  );
}

export default TaskChart;