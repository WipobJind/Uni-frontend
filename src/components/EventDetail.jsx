import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const titleRef = useRef();
  const dateRef = useRef();
  const typeRef = useRef();
  const courseIdRef = useRef();

  async function loadEvent() {
    // TODO: Implement the event loading function
    // Step 1: Send a GET request to `${API_URL}/api/event/${id}` with { credentials: "include" }
    // Step 2: If result.status is 401, call logout() and return (session expired)
    // Step 3: If result.status is 404, call navigate("/events") and return (event not found)
    // Step 4: Parse the response JSON into a variable called "data"
    // Step 5: Populate each ref with the data from the API:
    //         - titleRef.current.value = data.title || ""
    //         - dateRef: if data.date exists, set to new Date(data.date).toISOString().slice(0, 16)
    //         - typeRef.current.value = data.type || "Other"
    //         - courseIdRef.current.value = data.courseId || ""
    // Step 6: Call setIsLoading(false) to show the form
  }

  async function loadCourses() {
    // TODO: Implement the courses loading function (for the dropdown)
    // Step 1: Send a GET request to `${API_URL}/api/course` with { credentials: "include" }
    // Step 2: If result.status is 401, return early
    // Step 3: Parse the response JSON and call setCourses() with the result
  }

  async function onUpdate() {
    // TODO: Implement the event update handler
    // Step 1: Clear the message state: setMessage("")
    // Step 2: Build the request body from refs:
    //         { title, date, type, courseId (use value || null) }
    // Step 3: Send a PATCH request to `${API_URL}/api/event/${id}` with:
    //         - method: "PATCH"
    //         - headers: { "Content-Type": "application/json" }
    //         - body: JSON.stringify(body)
    //         - credentials: "include"
    // Step 4: If result.status is 200, call setMessage("success"), otherwise setMessage("error")
  }

  useEffect(() => { loadCourses().then(() => loadEvent()); }, []);

  return (
    <div className="page" style={{ maxWidth: "520px" }}>
      <div className="card">
        <h2 style={{ marginBottom: "16px" }}>Edit Event</h2>
        {isLoading ? <p>Loading...</p> : (
          <>
            <div className="form-grid">
              <div className="form-group"><label>Title</label><input type="text" ref={titleRef} /></div>
              <div className="form-group"><label>Date</label><input type="datetime-local" ref={dateRef} /></div>
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
            <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
              <button onClick={onUpdate} style={{ padding: "10px 24px" }}>Update</button>
              <button onClick={() => navigate("/events")} style={{ padding: "10px 24px", backgroundColor: "#718096" }}>Back</button>
            </div>
            {message === "success" && <div className="msg-success">Event updated</div>}
            {message === "error" && <div className="msg-error">Update failed</div>}
          </>
        )}
      </div>
    </div>
  );
}
