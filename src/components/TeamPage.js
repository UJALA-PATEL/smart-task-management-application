import React, { useMemo } from "react";

function TeamPage({ tasks }) {

  const user = JSON.parse(localStorage.getItem("user"));

  const assignedByMe = useMemo(
    () => tasks.filter(t => t.createdBy?._id === user._id),
    [tasks, user]
  );

  const assignedToMe = useMemo(
    () => tasks.filter(t => t.assignedTo?._id === user._id),
    [tasks, user]
  );

  const allTasks = [...assignedByMe, ...assignedToMe];

  const completed = allTasks.filter(t => t.status === "Done").length;
  const progress = allTasks.filter(t => t.status === "In Progress").length;
  const pending = allTasks.filter(t => t.status === "Todo").length;

  const completionRate =
    allTasks.length === 0
      ? 0
      : Math.round((completed / allTasks.length) * 100);

  const getStatusStyle = (status) => {
    if (status === "Done") return "#22c55e";
    if (status === "In Progress") return "#f59e0b";
    return "#ef4444";
  };

  const getPriorityTag = (priority) => {
    if (priority === "High") return "danger";
    if (priority === "Medium") return "warning";
    return "success";
  };

  return (
    <div className="container py-3">

      {/* HEADER */}
      <div className="text-center mb-4">
        <h2 className="fw-bold">👥 Team Workspace Pro</h2>
        <p className="text-muted" style={{ fontSize: "13px" }}>
          Real-time collaboration overview & task intelligence
        </p>
      </div>

      {/* 🔥 INSIGHT CARDS */}
      <div className="row g-3 mb-4">

        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h6>Total Tasks</h6>
            <h3>{allTasks.length}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h6 className="text-success">Completed</h6>
            <h3>{completed}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h6 className="text-warning">In Progress</h6>
            <h3>{progress}</h3>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card p-3 text-center shadow-sm">
            <h6 className="text-danger">Pending</h6>
            <h3>{pending}</h3>
          </div>
        </div>

      </div>

      {/* 🔥 PROGRESS BAR */}
      <div className="card p-3 mb-4 shadow-sm">

        <div className="d-flex justify-content-between mb-2">
          <h6>📊 Completion Rate</h6>
          <h6>{completionRate}%</h6>
        </div>

        <div className="progress" style={{ height: "10px" }}>
          <div
            className="progress-bar bg-success"
            style={{ width: `${completionRate}%` }}
          />
        </div>

      </div>

      {/* 🔥 WORKSPACE */}
      <div className="row g-3">

        {/* LEFT */}
        <div className="col-md-6">

          <div className="card p-3 shadow-sm h-100">

            <h5 className="mb-3">📤 Assigned By You</h5>

            {assignedByMe.length === 0 ? (
              <p className="text-muted text-center">No tasks assigned 🚀</p>
            ) : (
              assignedByMe.map(t => (
                <div
                  key={t._id}
                  className="p-3 mb-2 rounded"
                  style={{
                    borderLeft: `5px solid ${getStatusStyle(t.status)}`,
                    background: "#f9fafb"
                  }}
                >

                  <div className="fw-bold">{t.title}</div>

                  <small className="text-muted">
                    To: {t.assignedTo?.email || "Unassigned"}
                  </small>

                  <div className="mt-2 d-flex gap-2 flex-wrap">

                    <span className="badge bg-dark">
                      {t.status}
                    </span>

                    <span className={`badge bg-${getPriorityTag(t.priority)}`}>
                      {t.priority || "Low"}
                    </span>

                  </div>

                </div>
              ))
            )}

          </div>
        </div>

        {/* RIGHT */}
        <div className="col-md-6">

          <div className="card p-3 shadow-sm h-100">

            <h5 className="mb-3">📥 Assigned To You</h5>

            {assignedToMe.length === 0 ? (
              <p className="text-muted text-center">No tasks received 🚀</p>
            ) : (
              assignedToMe.map(t => (
                <div
                  key={t._id}
                  className="p-3 mb-2 rounded"
                  style={{
                    borderLeft: `5px solid ${getStatusStyle(t.status)}`,
                    background: "#f9fafb"
                  }}
                >

                  <div className="fw-bold">{t.title}</div>

                  <small className="text-muted">
                    From: {t.createdBy?.email || "Unknown"}
                  </small>

                  <div className="mt-2 d-flex gap-2 flex-wrap">

                    <span className="badge bg-dark">
                      {t.status}
                    </span>

                    <span className={`badge bg-${getPriorityTag(t.priority)}`}>
                      {t.priority || "Low"}
                    </span>

                  </div>

                </div>
              ))
            )}

          </div>
        </div>

      </div>

    </div>
  );
}

export default TeamPage;