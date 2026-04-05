import React from "react";

function TaskFilter({ filter, setFilter, search, setSearch }) {

  return (
    <div className="mb-4">

      <div className="row">

        <div className="col-md-6">

          <input
            type="text"
            className="form-control"
            placeholder="Search task..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        <div className="col-md-6">

          <select
            className="form-control"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >

            <option value="all">All Tasks</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="high">High Priority</option>

          </select>

        </div>

      </div>

    </div>
  );
}

export default TaskFilter;