import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserProvider";

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useUser();
  const API_URL = import.meta.env.VITE_API_URL;

  async function fetchDashboard() {
    // TODO: Implement the dashboard data fetching
    // Step 1: Wrap everything in a try/catch block
    // Step 2: Send a GET request to `${API_URL}/api/dashboard` with { credentials: "include" }
    // Step 3: If the response status is 401, call logout() and return (session expired)
    // Step 4: Parse the response JSON and call setData() with the result
    // Step 5: Call setIsLoading(false) to stop the loading state
    // Step 6: In the catch block, console.log the error
  }

  useEffect(() => { fetchDashboard(); }, []);

  if (isLoading) return <div className="page">Loading dashboard...</div>;

  return (
    <div className="page">
      <h2 style={{ marginBottom: "16px" }}>Dashboard</h2>

      {/* TODO: Implement the statistics cards section */}
      {/* Create a div with className="stat-grid" containing 3 stat cards: */}
      {/*   Card 1 - Current GPA: */}
      {/*     - borderTop: "3px solid #2b6cb0" */}
      {/*     - Display data.gpa as stat-number (color: "#2b6cb0") */}
      {/*     - Label: "Current GPA" */}
      {/*     - Sub-text: "Target: {data.targetGPA}" */}
      {/*   Card 2 - Degree Progress: */}
      {/*     - borderTop: "3px solid #276749" */}
      {/*     - Display data.progressPercent + "%" as stat-number (color: "#276749") */}
      {/*     - Label: "Degree Progress" */}
      {/*     - Sub-text: "{data.completedCredits}/{data.totalPlannedCredits} credits" */}
      {/*   Card 3 - Total Courses: */}
      {/*     - borderTop: "3px solid #6b46c1" */}
      {/*     - Display data.totalCourses as stat-number (color: "#6b46c1") */}
      {/*     - Label: "Total Courses" */}

      {/* TODO: Implement the status counts section */}
      {/* Create another div with className="stat-grid" containing 3 stat cards: */}
      {/*   Card 1: data.statusCounts.Planned — label "Planned" */}
      {/*   Card 2: data.statusCounts["In-Progress"] — label "In Progress" */}
      {/*   Card 3: data.statusCounts.Completed — label "Completed" */}

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
