import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

function TaskChart({ tasks }) {

  const completed = tasks.filter(t => t.completed).length;
  const pending = tasks.filter(t => !t.completed).length;
  const high = tasks.filter(t => t.priority === "High").length;

  const data = {
    labels: ["Completed", "Pending", "High Priority"],
    datasets: [
      {
        data: [completed, pending, high],
        backgroundColor: ["green", "orange", "red"]
      }
    ]
  };

  return (
    <div className="card p-3 mb-4">

      <h4>Productivity Analytics</h4>

      <Pie data={data} />

    </div>
  );
}

export default TaskChart;