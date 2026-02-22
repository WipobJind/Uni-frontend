import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [courseData, setCourseData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  const courseCodeRef = useRef();
  const titleRef = useRef();
  const creditsRef = useRef();
  const statusRef = useRef();
  const gradeRef = useRef();
  const semesterRef = useRef();
  const yearRef = useRef();

  async function loadCourse() {
    const result = await fetch(`${API_URL}/api/course/${id}`, { credentials: "include" });
    if (result.status === 401) { logout(); return; }
    if (result.status === 404) { navigate("/courses"); return; }
    setCourseData(await result.json());
  }

  useEffect(() => { loadCourse(); }, []);

  useEffect(() => {
    if (courseData && courseCodeRef.current) {
      courseCodeRef.current.value = courseData.courseCode || "";
      titleRef.current.value = courseData.title || "";
      creditsRef.current.value = courseData.credits || 3;
      if (statusRef.current) statusRef.current.value = courseData.status || "Planned";
      if (gradeRef.current) gradeRef.current.value = courseData.grade || "";
      semesterRef.current.value = courseData.semester || "";
      yearRef.current.value = courseData.year || new Date().getFullYear();
      setIsLoading(false);
    }
  }, [courseData]);

  async function onUpdate() {
    setMessage("");
    const body = {
      courseCode: courseCodeRef.current.value, title: titleRef.current.value,
      credits: Number(creditsRef.current.value), status: statusRef.current.value,
      grade: gradeRef.current.value, semester: semesterRef.current.value, year: Number(yearRef.current.value),
    };
    const result = await fetch(`${API_URL}/api/course/${id}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), credentials: "include",
    });
    setMessage(result.status === 200 ? "success" : "error");
  }

  return (
    <div className="page" style={{ maxWidth: "520px" }}>
      <div className="card">
        <h2 style={{ marginBottom: "16px" }}>Edit Course</h2>
        {isLoading && <p>Loading...</p>}
        <div style={{ display: isLoading ? "none" : "block" }}>
          <div className="form-grid">
            <div className="form-group"><label>Course Code</label><input type="text" ref={courseCodeRef} /></div>
            <div className="form-group"><label>Title</label><input type="text" ref={titleRef} /></div>
            <div className="form-group"><label>Credits</label><input type="number" ref={creditsRef} /></div>
            <div className="form-group">
              <label>Status</label>
              <select ref={statusRef}><option>Planned</option><option>In-Progress</option><option>Completed</option></select>
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
            <div className="form-group"><label>Semester</label><input type="text" ref={semesterRef} /></div>
            <div className="form-group"><label>Year</label><input type="number" ref={yearRef} /></div>
          </div>
          <div style={{ marginTop: "16px", display: "flex", gap: "8px" }}>
            <button onClick={onUpdate} style={{ padding: "10px 24px" }}>Update</button>
            <button onClick={() => navigate("/courses")} style={{ padding: "10px 24px", backgroundColor: "#718096" }}>Back</button>
          </div>
          {message === "success" && <div className="msg-success">Course updated</div>}
          {message === "error" && <div className="msg-error">Update failed</div>}
        </div>
      </div>
    </div>
  );
}