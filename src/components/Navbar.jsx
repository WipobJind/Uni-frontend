import { Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function Navbar() {
  const { user } = useUser();
  const location = useLocation();

  const linkStyle = (path) => ({
    color: location.pathname === path ? "white" : "rgba(255,255,255,0.75)",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "14px",
    fontWeight: location.pathname === path ? "600" : "400",
    backgroundColor: location.pathname === path ? "rgba(255,255,255,0.15)" : "transparent",
    transition: "all 0.2s",
  });

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 24px", backgroundColor: "#1a365d", color: "white",
      flexWrap: "wrap", gap: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "bold", letterSpacing: "-0.5px" }}>
        UniPath
      </Link>
      <div style={{ display: "flex", gap: "4px", flexWrap: "wrap" }}>
        {user.isLoggedIn ? (
          <>
            <Link to="/dashboard" style={linkStyle("/dashboard")}>Dashboard</Link>
            <Link to="/courses" style={linkStyle("/courses")}>Courses</Link>
            <Link to="/events" style={linkStyle("/events")}>Events</Link>
            <Link to="/profile" style={linkStyle("/profile")}>Profile</Link>
            <Link to="/logout" style={{ ...linkStyle("/logout"), color: "#feb2b2" }}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={linkStyle("/login")}>Login</Link>
            <Link to="/register" style={linkStyle("/register")}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}