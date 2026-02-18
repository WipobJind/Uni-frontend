import { useEffect, useState, useRef } from "react";
import { useUser } from "../contexts/UserProvider";

export default function Profile() {
  const { logout } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const majorRef = useRef();
  const enrollmentYearRef = useRef();
  const targetGPARef = useRef();

  async function fetchProfile() {
    const result = await fetch(`${API_URL}/api/user/profile`, { credentials: "include" });
    if (result.status === 401) { logout(); return; }
    const json = await result.json();
    setData(json);
    setIsLoading(false);
  }

  async function onUpdate() {
    setMessage("");
    const body = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      major: majorRef.current.value,
      enrollmentYear: Number(enrollmentYearRef.current.value),
      targetGPA: Number(targetGPARef.current.value),
    };

    const result = await fetch(`${API_URL}/api/user/profile`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (result.status === 200) { setMessage("success"); fetchProfile(); }
    else { setMessage("error"); }
  }

  useEffect(() => { fetchProfile(); }, []);

  if (isLoading) return <div className="page">Loading...</div>;

  return (
    <div className="page" style={{ maxWidth: "520px" }}>
      <div className="card">
        <h2 style={{ marginBottom: "16px" }}>Profile</h2>
        <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "4px" }}><strong>Username:</strong> {data.username}</p>
        <p style={{ fontSize: "14px", color: "#4a5568", marginBottom: "16px" }}><strong>Email:</strong> {data.email}</p>

        <div className="form-grid">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" ref={firstnameRef} defaultValue={data.firstname} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" ref={lastnameRef} defaultValue={data.lastname} />
          </div>
          <div className="form-group">
            <label>Major</label>
            <input type="text" ref={majorRef} defaultValue={data.major} />
          </div>
          <div className="form-group">
            <label>Enrollment Year</label>
            <input type="number" ref={enrollmentYearRef} defaultValue={data.enrollmentYear} />
          </div>
          <div className="form-group">
            <label>Target GPA</label>
            <input type="number" ref={targetGPARef} step="0.01" defaultValue={data.targetGPA} />
          </div>
        </div>

        <button onClick={onUpdate} style={{ padding: "10px 24px", marginTop: "16px" }}>Update Profile</button>
        {message === "success" && <div className="msg-success">Profile updated</div>}
        {message === "error" && <div className="msg-error">Update failed</div>}
      </div>
    </div>
  );
}
