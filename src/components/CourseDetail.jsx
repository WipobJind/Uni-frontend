import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { logout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const courseCodeRef = useRef();
  const titleRef = useRef();
  const creditsRef = useRef();
  const statusRef = useRef();
  const gradeRef = useRef();
  const semesterRef = useRef();
  const yearRef = useRef();

  async function loadCourse() {
    // TODO: Implement the course loading function
    // Step 1: Send a GET request to `${API_URL}/api/course/${id}` with { credentials: "include" }
    // Step 2: If result.status is 401, call logout() and return (session expired)
    // Step 3: If result.status is 404, call navigate("/courses") and return (course not found)
    // Step 4: Parse the response JSON into a variable called "data"
    // Step 5: Populate each ref with the data from the API response:
    //         - courseCodeRef.current.value = data.courseCode || ""
    //         - titleRef.current.value = data.title || ""
    //         - creditsRef.current.value = data.credits || 3
    //         - statusRef.current.value = data.status || "Planned"
    //         - gradeRef.current.value = data.grade || ""
    //         - semesterRef.current.value = data.semester || ""
    //         - yearRef.current.value = data.year || new Date().getFullYear()
    // Step 6: Call setIsLoading(false) to show the form
  }

  async function onUpdate() {
    // TODO: Implement the course update handler
    // Step 1: Clear the message state: setMessage("")
    // Step 2: Build the request body by reading values from all refs:
    //         { courseCode, title, credits (as Number), status, grade, semester, year (as Number) }
    // Step 3: Send a PATCH request to `${API_URL}/api/course/${id}` with:
    //         - method: "PATCH"
    //         - headers: { "Content-Type": "application/json" }
    //         - body: JSON.stringify(body)
    //         - credentials: "include"
    // Step 4: If result.status is 200, call setMessage("success"), otherwise setMessage("error")
  }

  useEffect(() => { loadCourse(); }, []);

  return (
    <div className="page" style={{ maxWidth: "520px" }}>
      <div className="card">
        <h2 style={{ marginBottom: "16px" }}>Edit Course</h2>
        {isLoading ? <p>Loading...</p> : (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
