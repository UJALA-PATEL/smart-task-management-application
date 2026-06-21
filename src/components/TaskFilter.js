import React from "react";

function TaskFilter({
  filter,
  setFilter,
  search,
  setSearch,
}) {
  return (
    <div className="mb-4">
      <div className="row g-3">

        {/* SEARCH */}
        <div className="col-12 col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search task..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />
        </div>

        {/* FILTER */}
        <div className="col-12 col-md-6">
          <select
            className="form-control"
            value={filter}
            onChange={(e) =>
              setFilter(e.target.value)
            }
          >
            <option value="all">
              All
            </option>

            <option value="todo">
              Todo
            </option>

            <option value="progress">
              In Progress
            </option>

            <option value="done">
              Done
            </option>
          </select>
        </div>

      </div>
    </div>
  );
}

export default TaskFilter;