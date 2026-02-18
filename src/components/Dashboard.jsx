import { useEffect, useState } from "react";
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

  return (
    <div className="page">
      <h2 style={{ marginBottom: "16px" }}>Dashboard</h2>

      <div className="stat-grid">
        <div className="stat-card" style={{ borderTop: "3px solid #2b6cb0" }}>
          <div className="stat-number" style={{ color: "#2b6cb0" }}>{data.gpa}</div>
          <div className="stat-label">Current GPA</div>
          <div className="stat-sub">Target: {data.targetGPA}</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid #276749" }}>
          <div className="stat-number" style={{ color: "#276749" }}>{data.progressPercent}%</div>
          <div className="stat-label">Degree Progress</div>
          <div className="stat-sub">{data.completedCredits}/{data.totalPlannedCredits} credits</div>
        </div>
        <div className="stat-card" style={{ borderTop: "3px solid #6b46c1" }}>
          <div className="stat-number" style={{ color: "#6b46c1" }}>{data.totalCourses}</div>
          <div className="stat-label">Total Courses</div>
        </div>
      </div>

      <div className="stat-grid">
        <div className="stat-card">
          <strong>{data.statusCounts.Planned}</strong>
          <div className="stat-sub">Planned</div>
        </div>
        <div className="stat-card">
          <strong>{data.statusCounts["In-Progress"]}</strong>
          <div className="stat-sub">In Progress</div>
        </div>
        <div className="stat-card">
          <strong>{data.statusCounts.Completed}</strong>
          <div className="stat-sub">Completed</div>
        </div>
      </div>

      <div className="card">
        <h3 style={{ marginBottom: "12px" }}>Upcoming Events (Next 7 Days)</h3>
        {data.upcomingEvents.length === 0 ? (
          <p className="text-muted">No upcoming events</p>
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
                    <td>{new Date(event.date).toLocaleDateString()}</td>
                    <td><span className="badge" style={{ backgroundColor: "#e2e8f0" }}>{event.type}</span></td>
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
