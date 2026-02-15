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
    // TODO: Implement the registration handler
    // Step 1: Clear previous errors by calling setError("")
    // Step 2: Build a request body object by reading values from the refs:
    //         {
    //           username: usernameRef.current.value,
    //           email: emailRef.current.value,
    //           password: passwordRef.current.value,
    //           firstname: firstnameRef.current.value,
    //           lastname: lastnameRef.current.value,
    //           major: majorRef.current.value,
    //           enrollmentYear: Number(enrollmentYearRef.current.value) || new Date().getFullYear(),
    //           targetGPA: Number(targetGPARef.current.value) || 4.0,
    //         }
    // Step 3: Validate that username, email, and password are not empty
    //         If any is missing, call setError("Username, email, and password are required") and return
    // Step 4: Send a POST request to `${API_URL}/api/user` with:
    //         - method: "POST"
    //         - headers: { "Content-Type": "application/json" }
    //         - body: JSON.stringify(body)
    // Step 5: Parse the response JSON: const data = await result.json()
    // Step 6: If status is 200, call setSuccess(true) and use setTimeout to navigate to "/login" after 2000ms
    // Step 7: If status is not 200, call setError(data.message || "Registration failed")
    // Step 8: Wrap the fetch in try/catch — in catch, call setError("Network error")
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
