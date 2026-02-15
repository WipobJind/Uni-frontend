import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const { logout } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  const titleRef = useRef();
  const dateRef = useRef();
  const typeRef = useRef();
  const courseIdRef = useRef();

  async function loadEvents() {
    try {
      const result = await fetch(`${API_URL}/api/event`, { credentials: "include" });
      if (result.status === 401) { logout(); return; }
      setEvents(await result.json());
    } catch (err) { console.log("Load events error:", err); }
  }

  async function loadCourses() {
    try {
      const result = await fetch(`${API_URL}/api/course`, { credentials: "include" });
      if (result.status === 401) return;
      setCourses(await result.json());
    } catch (err) { console.log("Load courses error:", err); }
  }

  async function onAdd() {
    // TODO: Implement the add event handler
    // Step 1: Clear previous errors: setError("")
    // Step 2: Build the request body from refs:
    //         {
    //           title: titleRef.current.value,
    //           date: dateRef.current.value,
    //           type: typeRef.current.value,
    //           courseId: courseIdRef.current.value || null,
    //         }
    // Step 3: Validate that title and date are not empty
    //         If missing, call setError("Title and date are required") and return
    // Step 4: Send a POST request to `${API_URL}/api/event` with:
    //         - method: "POST"
    //         - headers: { "Content-Type": "application/json" }
    //         - body: JSON.stringify(body)
    //         - credentials: "include"
    // Step 5: If status is 200, call setShowForm(false) and loadEvents()
    // Step 6: If not 200, parse JSON and setError(data.message || "Failed")
  }

  async function onToggleComplete(event) {
    // TODO: Implement the toggle completion handler
    // Step 1: Send a PATCH request to `${API_URL}/api/event/${event._id}` with:
    //         - method: "PATCH"
    //         - headers: { "Content-Type": "application/json" }
    //         - body: JSON.stringify({ isCompleted: !event.isCompleted })
    //         - credentials: "include"
    // Step 2: Call loadEvents() to refresh the list with the updated status
  }

  async function onDelete(id) {
    // TODO: Implement the delete event handler
    // Step 1: Show a confirmation dialog: if (!confirm("Delete this event?")) return
    // Step 2: Send a DELETE request to `${API_URL}/api/event/${id}` with { method: "DELETE", credentials: "include" }
    // Step 3: Call loadEvents() to refresh the list
  }

  useEffect(() => { loadEvents(); loadCourses(); }, []);

  const typeStyle = {
    "Exam": { backgroundColor: "#fed7d7", color: "#742a2a" },
    "Assignment": { backgroundColor: "#fefcbf", color: "#744210" },
    "Study": { backgroundColor: "#c6f6d5", color: "#22543d" },
    "Other": { backgroundColor: "#e2e8f0", color: "#2d3748" },
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Events</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "8px 16px" }}>
          {showForm ? "Cancel" : "Add Event"}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: "16px" }}>
          <div className="form-grid">
            <div className="form-group"><label>Title *</label><input type="text" ref={titleRef} placeholder="Final Exam" /></div>
            <div className="form-group"><label>Date *</label><input type="datetime-local" ref={dateRef} /></div>
            <div className="form-group">
              <label>Type</label>
              <select ref={typeRef}><option>Exam</option><option>Assignment</option><option>Study</option><option>Other</option></select>
            </div>
            <div className="form-group">
              <label>Linked Course</label>
              <select ref={courseIdRef}>
                <option value="">None</option>
                {courses.map((c) => <option key={c._id} value={c._id}>{c.courseCode} - {c.title}</option>)}
              </select>
            </div>
          </div>
          <button onClick={onAdd} style={{ padding: "8px 24px", marginTop: "12px" }}>Save</button>
          {error && <div className="msg-error">{error}</div>}
        </div>
      )}

      {events.length === 0 ? (
        <p className="text-muted">No events yet. Add your first event.</p>
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>Done</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {events.map((e) => (
                  <tr key={e._id} style={{ opacity: e.isCompleted ? 0.5 : 1, textDecoration: e.isCompleted ? "line-through" : "none" }}>
                    <td><input type="checkbox" checked={e.isCompleted} onChange={() => onToggleComplete(e)} /></td>
                    <td>{e.title}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{new Date(e.date).toLocaleString()}</td>
                    <td><span className="badge" style={typeStyle[e.type] || {}}>{e.type}</span></td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Link to={`/events/${e._id}`} className="action-link">Edit</Link>
                      {" | "}
                      <span className="action-delete" onClick={() => onDelete(e._id)}>Delete</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
