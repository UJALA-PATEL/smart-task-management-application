import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function TaskChart({ tasks }) {

  if (!tasks || tasks.length === 0) {
    return null;
  }

  const todo = tasks.filter(t => t.status === "Todo").length;
  const inProgress = tasks.filter(t => t.status === "In Progress").length;
  const done = tasks.filter(t => t.status === "Done").length;

  const data = {
    labels: ["Todo", "In Progress", "Done"],
    datasets: [
      {
        data: [todo, inProgress, done],
        backgroundColor: ["#6c757d", "#ffc107", "#198754"]
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  };

  return (
    <div className="d-flex justify-content-center mb-4">
      <div className="card p-3 text-center" style={{ width: "300px" }}>
        <h6 className="mb-3">📊 Task Status</h6>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
}

export default TaskChart;