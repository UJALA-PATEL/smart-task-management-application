import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

function Analytics({ tasks }) {

  const [filter, setFilter] = useState("all");

  // 🔥 FILTER LOGIC
  const filteredTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    const now = new Date();

    if (filter === "week") {
      return (now - taskDate) / (1000 * 60 * 60 * 24) <= 7;
    }

    if (filter === "month") {
      return (now - taskDate) / (1000 * 60 * 60 * 24) <= 30;
    }

    return true;
  });

  // 🔥 COUNTS
  const total = filteredTasks.length;
  const done = filteredTasks.filter(t => t.status === "Done").length;
  const todo = filteredTasks.filter(t => t.status === "Todo").length;
  const progress = filteredTasks.filter(t => t.status === "In Progress").length;

  // 🔥 PRODUCTIVITY
  const productivity = total === 0 ? 0 : Math.round((done / total) * 100);

  const data = {
    labels: ["Todo", "In Progress", "Done"],
    datasets: [
      {
        data: [todo, progress, done],
        backgroundColor: ["#6c757d", "#ffc107", "#198754"],
        borderRadius: 6
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }
    }
  };

  return (
    <div className="mt-4">

      <h4 className="mb-3">📊 Analytics Dashboard</h4>

      {/* 🔥 FILTER BUTTONS */}
      <div className="mb-3">
        <button className="btn btn-sm btn-outline-primary me-2" onClick={() => setFilter("all")}>
          All
        </button>
        <button className="btn btn-sm btn-outline-success me-2" onClick={() => setFilter("week")}>
          This Week
        </button>
        <button className="btn btn-sm btn-outline-warning" onClick={() => setFilter("month")}>
          This Month
        </button>
      </div>

      {/* 🔥 STATS */}
      <div className="row mb-3">

        <div className="col-md-3">
          <div className="card p-2 text-center">
            <h6>Total</h6>
            <h4>{total}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2 text-center">
            <h6>Done</h6>
            <h4>{done}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2 text-center">
            <h6>In Progress</h6>
            <h4>{progress}</h4>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-2 text-center">
            <h6>Productivity</h6>
            <h4>{productivity}%</h4>
          </div>
        </div>

      </div>

      {/* 🔥 SMALL GRAPH */}
      <div className="card p-3">
        <div style={{ height: "200px" }}>
          <Bar data={data} options={options} />
        </div>
      </div>

    </div>
  );
}

export default Analytics;