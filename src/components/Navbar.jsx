import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function Navbar() {
  const { user } = useUser();

  return (
    <nav style={{
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "12px 16px", backgroundColor: "#1a365d", color: "white",
      flexWrap: "wrap", gap: "8px",
    }}>
      <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "18px", fontWeight: "bold" }}>
        UniPath
      </Link>
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", fontSize: "14px" }}>
        {user.isLoggedIn ? (
          <>
            <Link to="/dashboard" style={{ color: "white", textDecoration: "none" }}>Dashboard</Link>
            <Link to="/courses" style={{ color: "white", textDecoration: "none" }}>Courses</Link>
            <Link to="/events" style={{ color: "white", textDecoration: "none" }}>Events</Link>
            <Link to="/profile" style={{ color: "white", textDecoration: "none" }}>Profile</Link>
            <Link to="/logout" style={{ color: "#feb2b2", textDecoration: "none" }}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>Login</Link>
            <Link to="/register" style={{ color: "white", textDecoration: "none" }}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
   