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
    const result = await fetch(`${API_URL}/api/event/${id}`, { credentials: "include" });
    if (result.status === 401) { logout(); return; }
    if (result.status === 404) { navigate("/events"); return; }
    const data = await result.json();
    titleRef.current.value = data.title || "";
    if (data.date) dateRef.current.value = new Date(data.date).toISOString().slice(0, 16);
    typeRef.current.value = data.type || "Other";
    courseIdRef.current.value = data.courseId || "";
    setIsLoading(false);
  }

  async function loadCourses() {
    const result = await fetch(`${API_URL}/api/course`, { credentials: "include" });
    if (result.status === 401) return;
    setCourses(await result.json());
  }

  async function onUpdate() {
    setMessage("");
    const body = {
      title: titleRef.current.value, date: dateRef.current.value,
      type: typeRef.current.value, courseId: courseIdRef.current.value || null,
    };
    const result = await fetch(`${API_URL}/api/event/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), credentials: "include",
    });
    setMessage(result.status === 200 ? "success" : "error");
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
