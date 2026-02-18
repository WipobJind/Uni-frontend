import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const majorRef = useRef();
  const enrollmentYearRef = useRef();
  const targetGPARef = useRef();

  async function onRegister() {
    setError("");
    const body = {
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      major: majorRef.current.value,
      enrollmentYear: Number(enrollmentYearRef.current.value) || new Date().getFullYear(),
      targetGPA: Number(targetGPARef.current.value) || 4.0,
    };

    if (!body.username || !body.email || !body.password) {
      setError("Username, email, and password are required");
      return;
    }

    try {
      const result = await fetch(`${API_URL}/api/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await result.json();
      if (result.status === 200) {
        setSuccess(true);
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError("Network error");
    }
  }

  return (
    <div className="page" style={{ maxWidth: "480px" }}>
      <div className="card">
        <h2 style={{ marginBottom: "16px" }}>Register</h2>
        {success && <div className="msg-success" style={{ marginBottom: "12px" }}>Registration successful! Redirecting...</div>}

        <div className="form-grid">
          <div className="form-group">
            <label>Username *</label>
            <input type="text" ref={usernameRef} />
          </div>
          <div className="form-group">
            <label>Email *</label>
            <input type="email" ref={emailRef} />
          </div>
          <div className="form-group" style={{ gridColumn: "1 / -1" }}>
            <label>Password *</label>
            <input type="password" ref={passwordRef} />
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input type="text" ref={firstnameRef} />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" ref={lastnameRef} />
          </div>
          <div className="form-group">
            <label>Major</label>
            <input type="text" ref={majorRef} placeholder="e.g. Computer Science" />
          </div>
          <div className="form-group">
            <label>Enrollment Year</label>
            <input type="number" ref={enrollmentYearRef} defaultValue={new Date().getFullYear()} />
          </div>
          <div className="form-group">
            <label>Target GPA</label>
            <input type="number" ref={targetGPARef} step="0.01" defaultValue="4.0" />
          </div>
        </div>

        <button onClick={onRegister} style={{ padding: "10px 24px", marginTop: "16px" }}>Register</button>
        {error && <div className="msg-error">{error}</div>}
        <p style={{ marginTop: "16px", fontSize: "14px" }}>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
}
