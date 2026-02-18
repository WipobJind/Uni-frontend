import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const { logout } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  const courseCodeRef = useRef();
  const titleRef = useRef();
  const creditsRef = useRef();
  const statusRef = useRef();
  const gradeRef = useRef();
  const semesterRef = useRef();
  const yearRef = useRef();

  async function loadCourses() {
    try {
      const result = await fetch(`${API_URL}/api/course`, { credentials: "include" });
      if (result.status === 401) { logout(); return; }
      setCourses(await result.json());
    } catch (err) {
      console.log("Load courses error:", err);
    }
  }

  async function onAdd() {
    setError("");
    const body = {
      courseCode: courseCodeRef.current.value,
      title: titleRef.current.value,
      credits: Number(creditsRef.current.value) || 3,
      status: statusRef.current.value,
      grade: gradeRef.current.value,
      semester: semesterRef.current.value,
      year: Number(yearRef.current.value),
    };
    if (!body.courseCode || !body.title) { setError("Course code and title are required"); return; }

    const result = await fetch(`${API_URL}/api/course`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), credentials: "include",
    });
    if (result.status === 200) { setShowForm(false); loadCourses(); }
    else { const data = await result.json(); setError(data.message || "Failed"); }
  }

  async function onDelete(id) {
    if (!confirm("Delete this course and its events?")) return;
    await fetch(`${API_URL}/api/course/${id}`, { method: "DELETE", credentials: "include" });
    loadCourses();
  }

  useEffect(() => { loadCourses(); }, []);

  const statusStyle = {
    "Planned": { backgroundColor: "#e2e8f0", color: "#2d3748" },
    "In-Progress": { backgroundColor: "#fefcbf", color: "#744210" },
    "Completed": { backgroundColor: "#c6f6d5", color: "#22543d" },
  };

  return (
    <div className="page">
      <div className="page-header">
        <h2>Courses</h2>
        <button onClick={() => setShowForm(!showForm)} style={{ padding: "8px 16px" }}>
          {showForm ? "Cancel" : "Add Course"}
        </button>
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: "16px" }}>
          <div className="form-grid">
            <div className="form-group">
              <label>Course Code *</label>
              <input type="text" ref={courseCodeRef} placeholder="CS101" />
            </div>
            <div className="form-group">
              <label>Title *</label>
              <input type="text" ref={titleRef} placeholder="Intro to CS" />
            </div>
            <div className="form-group">
              <label>Credits</label>
              <input type="number" ref={creditsRef} defaultValue={3} />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select ref={statusRef}>
                <option>Planned</option><option>In-Progress</option><option>Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Grade</label>
              <select ref={gradeRef}>
                <option value="">N/A</option>
                <option>A</option><option>A-</option><option>B+</option><option>B</option>
                <option>B-</option><option>C+</option><option>C</option><option>C-</option>
                <option>D+</option><option>D</option><option>F</option>
              </select>
            </div>
            <div className="form-group">
              <label>Semester</label>
              <input type="text" ref={semesterRef} placeholder="Fall" />
            </div>
            <div className="form-group">
              <label>Year</label>
              <input type="number" ref={yearRef} defaultValue={new Date().getFullYear()} />
            </div>
          </div>
          <button onClick={onAdd} style={{ padding: "8px 24px", marginTop: "12px" }}>Save</button>
          {error && <div className="msg-error">{error}</div>}
        </div>
      )}

      {courses.length === 0 ? (
        <p className="text-muted">No courses yet. Add your first course.</p>
      ) : (
        <div className="card">
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Credits</th>
                  <th>Status</th>
                  <th>Grade</th>
                  <th>Semester</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c._id}>
                    <td style={{ fontWeight: 600 }}>{c.courseCode}</td>
                    <td>{c.title}</td>
                    <td>{c.credits}</td>
                    <td>
                      <span className="badge" style={statusStyle[c.status] || {}}>{c.status}</span>
                    </td>
                    <td>{c.grade || "-"}</td>
                    <td>{c.semester} {c.year}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      <Link to={`/courses/${c._id}`} className="action-link">Edit</Link>
                      {" | "}
                      <span className="action-delete" onClick={() => onDelete(c._id)}>Delete</span>
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
