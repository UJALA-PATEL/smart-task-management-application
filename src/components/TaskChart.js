import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function TaskChart({ tasks }) {
  const [view, setView] = useState("me");
  const [mobile, setMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!tasks || tasks.length === 0) return null;

  const user = JSON.parse(localStorage.getItem("user"));

  const createdTasks = tasks.filter(
    (t) => t.createdBy?._id === user?._id
  );

  const assignedByMe = tasks.filter(
    (t) =>
      t.createdBy?._id === user?._id &&
      t.assignedTo &&
      t.assignedTo?._id !== user?._id
  );

  const myTasks = tasks.filter(
    (t) => t.assignedTo?._id === user?._id
  );

  const completedByMe = myTasks.filter(
    (t) => t.status === "Done"
  );

  const completedByOthers = assignedByMe.filter(
    (t) => t.status === "Done"
  );

  const myTodo = myTasks.filter(
    (t) => t.status === "Todo"
  ).length;

  const myProgress = myTasks.filter(
    (t) => t.status === "In Progress"
  ).length;

  const myDone = myTasks.filter(
    (t) => t.status === "Done"
  ).length;

  const chartDataValues =
    myTodo + myProgress + myDone === 0
      ? [1, 0, 0]
      : [myTodo, myProgress, myDone];

  const data = {
    labels: ["Todo", "In Progress", "Done"],
    datasets: [
      {
        data: chartDataValues,
        backgroundColor: [
          "#6366f1",
          "#f59e0b",
          "#22c55e"
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: mobile ? "bottom" : "bottom"
      }
    }
  };

  return (
    <div className="mt-4">
      {/* HEADER */}
      <div
        className="d-flex justify-content-between align-items-center mb-3"
        style={{
          flexWrap: "wrap",
          gap: "10px"
        }}
      >
        <h4 className="fw-bold mb-0">
          📊 Overview
        </h4>
      </div>

      {/* STATS */}
      <div className="row g-3 mb-4">
        <div className="col-lg-3 col-md-6 col-12">
          <div className="p-3 rounded shadow-sm bg-light text-center h-100">
            <h6>Created</h6>
            <h3>{createdTasks.length}</h3>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12">
          <div className="p-3 rounded shadow-sm bg-info text-white text-center h-100">
            <h6>Assigned</h6>
            <h3>{assignedByMe.length}</h3>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12">
          <div className="p-3 rounded shadow-sm bg-warning text-center h-100">
            <h6>My Tasks</h6>
            <h3>{myTasks.length}</h3>
          </div>
        </div>

        <div className="col-lg-3 col-md-6 col-12">
          <div className="p-3 rounded shadow-sm bg-success text-white text-center h-100">
            <h6>Done</h6>
            <h3>
              {completedByMe.length +
                completedByOthers.length}
            </h3>
          </div>
        </div>
      </div>

      {/* PIE CHART */}
      <div className="card p-3 shadow-sm mb-4 text-center">
        <h6 className="mb-3">
          My Task Status
        </h6>

        <div
          style={{
            height: mobile ? "180px" : "220px",
            width: mobile ? "180px" : "220px",
            margin: "auto"
          }}
        >
          <Pie data={data} options={options} />
        </div>
      </div>

      {/* BUTTONS */}
      <div
        className="d-flex gap-2 mb-3"
        style={{
          flexWrap: "wrap"
        }}
      >
        <button
          className={`btn ${
            view === "me"
              ? "btn-primary"
              : "btn-outline-primary"
          }`}
          style={{
            flex: 1,
            minWidth: mobile ? "100%" : "220px"
          }}
          onClick={() => setView("me")}
        >
          Completed by Me
        </button>

        <button
          className={`btn ${
            view === "others"
              ? "btn-success"
              : "btn-outline-success"
          }`}
          style={{
            flex: 1,
            minWidth: mobile ? "100%" : "220px"
          }}
          onClick={() => setView("others")}
        >
          Completed by Assigned User
        </button>
      </div>

      {/* OUTPUT */}
      <div className="card p-3 shadow-sm">
        {view === "me" ? (
          <>
            <h6 className="mb-3">
              ✅ Tasks Completed by You
            </h6>

            {completedByMe.length === 0 ? (
              <p className="mb-0">
                No tasks completed by you
              </p>
            ) : (
              completedByMe.map((t) => (
                <div
                  key={t._id}
                  style={{
                    padding: "8px 0",
                    borderBottom:
                      "1px solid #eee",
                    wordBreak: "break-word"
                  }}
                >
                  ✔ {t.title}
                </div>
              ))
            )}
          </>
        ) : (
          <>
            <h6 className="mb-3">
              👥 Tasks Completed by Assigned Users
            </h6>

            {completedByOthers.length === 0 ? (
              <p className="mb-0">
                No tasks completed by others
              </p>
            ) : (
              completedByOthers.map((t) => (
                <div
                  key={t._id}
                  style={{
                    padding: "8px 0",
                    borderBottom:
                      "1px solid #eee",
                    wordBreak: "break-word"
                  }}
                >
                  👤{" "}
                  <b>
                    {t.assignedTo?.email}
                  </b>{" "}
                  completed "{t.title}"
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default TaskChart;