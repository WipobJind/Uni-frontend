import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserProvider";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchDashboard() {
    try {
      const result = await fetch(`${API_URL}/api/dashboard`, { credentials: "include" });
      if (result.status === 401) { logout(); return; }
      setData(await result.json());
      setIsLoading(false);
    } catch (err) {
      console.log("Dashboard error:", err);
    }
  }

  useEffect(() => { fetchDashboard(); }, []);

  if (isLoading) return <div className="page">Loading dashboard...</div>;

  const gpaValue = data.gpa !== "N/A" ? parseFloat(data.gpa) : 0;
  const gpaPercent = Math.min((gpaValue / 4.0) * 100, 100);
  const targetPercent = Math.min((data.targetGPA / 4.0) * 100, 100);
  const gpaColor = gpaValue >= data.targetGPA ? "#276749" : gpaValue >= 2.5 ? "#d69e2e" : "#c53030";

  const typeStyle = {
    "Exam": { backgroundColor: "#fed7d7", color: "#742a2a" },
    "Assignment": { backgroundColor: "#fefcbf", color: "#744210" },
    "Study": { backgroundColor: "#c6f6d5", color: "#22543d" },
    "Other": { backgroundColor: "#e2e8f0", color: "#2d3748" },
  };

  const total = data.statusCounts.Planned + data.statusCounts["In-Progress"] + data.statusCounts.Completed;
  const plannedWidth = total > 0 ? (data.statusCounts.Planned / total) * 100 : 0;
  const inProgressWidth = total > 0 ? (data.statusCounts["In-Progress"] / total) * 100 : 0;
  const completedWidth = total > 0 ? (data.statusCounts.Completed / total) * 100 : 0;

  return (
    <div className="page">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "8px" }}>
        <h2 style={{ margin: 0 }}>Dashboard</h2>
        <div style={{ display: "flex", gap: "8px" }}>
          <Link to="/courses" style={{ textDecoration: "none" }}><button style={{ padding: "8px 16px" }}>Add Course</button></Link>
          <Link to="/events" style={{ textDecoration: "none" }}><button style={{ padding: "8px 16px", backgroundColor: "#6b46c1" }}>Add Event</button></Link>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card" style={{ borderTop: "3px solid #2b6cb0" }}>
          <div className="stat-number" style={{ color: gpaColor }}>{data.gpa}</div>
          <div className="stat-label">Current GPA</div>
          <div style={{ marginTop: "10px", backgroundColor: "#e2e8f0", borderRadius: "4px", height: "10px", position: "relative", overflow: "visible" }}>
            <div style={{ width: `${gpaPercent}%`, backgroundColor: gpaColor, height: "100%", borderRadius: "4px", transition: "width 0.6s ease" }}></div>
            <div style={{ position: "absolute", left: `${targetPercent}%`, top: "-3px", width: "2px", height: "16px", backgroundColor: "#c53030", borderRadius: "1px" }} title={`Target: ${data.targetGPA}`}></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <span className="stat-sub">0.0</span>
            <span className="stat-sub" style={{ color: "#c53030" }}>Target: {data.targetGPA}</span>
            <span className="stat-sub">4.0</span>
          </div>
        </div>

        <div className="stat-card" style={{ borderTop: "3px solid #276749" }}>
          <div className="stat-number" style={{ color: "#276749" }}>{data.progressPercent}%</div>
          <div className="stat-label">Degree Progress</div>
          <div style={{ marginTop: "10px", backgroundColor: "#e2e8f0", borderRadius: "4px", height: "10px" }}>
            <div style={{ width: `${data.progressPercent}%`, backgroundColor: "#276749", height: "100%", borderRadius: "4px", transition: "width 0.6s ease" }}></div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
            <span className="stat-sub">{data.completedCredits} completed</span>
            <span className="stat-sub">{data.totalPlannedCredits} total credits</span>
          </div>
        </div>

        <div className="stat-card" style={{ borderTop: "3px solid #6b46c1" }}>
          <div className="stat-number" style={{ color: "#6b46c1" }}>{data.totalCourses}</div>
          <div className="stat-label">Total Courses</div>
          {total > 0 && (
            <div style={{ marginTop: "10px", backgroundColor: "#e2e8f0", borderRadius: "4px", height: "10px", display: "flex", overflow: "hidden" }}>
              <div style={{ width: `${completedWidth}%`, backgroundColor: "#276749", height: "100%" }}></div>
              <div style={{ width: `${inProgressWidth}%`, backgroundColor: "#d69e2e", height: "100%" }}></div>
              <div style={{ width: `${plannedWidth}%`, backgroundColor: "#a0aec0", height: "100%" }}></div>
            </div>
          )}
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "8px", fontSize: "12px" }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#a0aec0", display: "inline-block" }}></span>
              {data.statusCounts.Planned} Planned
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#d69e2e", display: "inline-block" }}></span>
              {data.statusCounts["In-Progress"]} Active
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#276749", display: "inline-block" }}></span>
              {data.statusCounts.Completed} Done
            </span>
          </div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <h3 style={{ margin: 0 }}>Upcoming Events (Next 7 Days)</h3>
          <Link to="/events" style={{ fontSize: "13px" }}>View all</Link>
        </div>
        {data.upcomingEvents.length === 0 ? (
          <div style={{ textAlign: "center", padding: "24px 0" }}>
            <p className="text-muted" style={{ marginBottom: "8px" }}>No upcoming events in the next 7 days</p>
            <Link to="/events" style={{ fontSize: "13px" }}>Add an event</Link>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Type</th>
                </tr>
              </thead>
              <tbody>
                {data.upcomingEvents.map((event) => (
                  <tr key={event._id}>
                    <td>{event.title}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{new Date(event.date).toLocaleDateString()}</td>
                    <td><span className="badge" style={typeStyle[event.type] || {}}>{event.type}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}