import { useRef, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import { Navigate, Link } from "react-router-dom";

export default function Login() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState("");
  const emailRef = useRef();
  const passRef = useRef();
  const { user, login } = useUser();

  async function onLogin() {
    setIsLoggingIn(true);
    setError("");
    const result = await login(emailRef.current.value, passRef.current.value);
    if (!result) {
      setError("Invalid email or password");
    }
    setIsLoggingIn(false);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") onLogin();
  }

  if (user.isLoggedIn) return <Navigate to="/dashboard" replace />;

  return (
    <div style={{ maxWidth: "400px", margin: "60px auto", padding: "24px" }}>
      <h2>Login to UniPath</h2>
      <div style={{ marginBottom: "12px" }}>
        <label>Email</label><br />
        <input type="email" ref={emailRef} onKeyDown={handleKeyDown}
          style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
      </div>
      <div style={{ marginBottom: "12px" }}>
        <label>Password</label><br />
        <input type="password" ref={passRef} onKeyDown={handleKeyDown}
          style={{ width: "100%", padding: "8px", marginTop: "4px" }} />
      </div>
      <button onClick={onLogin} disabled={isLoggingIn}
        style={{ padding: "10px 24px", cursor: "pointer" }}>
        {isLoggingIn ? "Logging in..." : "Login"}
      </button>
      {error && <div style={{ color: "red", marginTop: "12px" }}>{error}</div>}
      <p style={{ marginTop: "16px" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}