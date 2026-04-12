import React, { useMemo } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { enUS } from "date-fns/locale";

const locales = { "en-US": enUS };

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

function CalendarPage({ tasks }) {

  const events = useMemo(() => {
    return tasks
      .filter(t => t.dueDate)
      .map(t => ({
        id: t._id,
        title: t.title,
        start: new Date(t.dueDate),
        end: new Date(t.dueDate),
        allDay: true,
        status: t.status,
      }));
  }, [tasks]);

  const eventStyleGetter = (event) => {
    let bg = "#3b82f6";

    if (event.status === "Done") bg = "#22c55e";
    if (event.status === "In Progress") bg = "#f59e0b";
    if (event.status === "Todo") bg = "#ef4444";

    return {
      style: {
        backgroundColor: bg,
        borderRadius: "8px",
        color: "#fff",
        border: "none",
        fontSize: "11px",
        padding: "2px 6px",
      },
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7fb",
        padding: "20px",
      }}
    >

      {/* HEADER */}
      <div className="text-center mb-3">
        <h3 className="fw-bold">📅 Task Calendar</h3>
        <p className="text-muted" style={{ fontSize: "13px" }}>
          Manage your deadlines in one clean view
        </p>
      </div>

      {/* LEGEND (compact) */}
      <div className="d-flex justify-content-center gap-2 mb-3 flex-wrap">

        <span className="badge bg-danger px-3 py-2">Todo</span>
        <span className="badge bg-warning text-dark px-3 py-2">In Progress</span>
        <span className="badge bg-success px-3 py-2">Done</span>

      </div>

      {/* CENTER CARD (SMALL & CLEAN) */}
      <div className="d-flex justify-content-center">

        <div
          style={{
            width: "95%",
            maxWidth: "850px",
            background: "rgba(255,255,255,0.9)",
            backdropFilter: "blur(10px)",
            borderRadius: "14px",
            padding: "12px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
          }}
        >

          {events.length === 0 ? (
            <div className="text-center p-4">
              <h6>🚀 No Scheduled Tasks</h6>
              <p className="text-muted" style={{ fontSize: "12px" }}>
                Add due dates to see tasks on calendar
              </p>
            </div>
          ) : (
            <div style={{ height: "420px" }}>
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                eventPropGetter={eventStyleGetter}
                popup
              />
            </div>
          )}

        </div>
      </div>

      {/* FOOTER TIP */}
      <div className="text-center mt-3">
        <small className="text-muted">
          💡 Click events to quickly track task progress
        </small>
      </div>

    </div>
  );
}

export default CalendarPage;