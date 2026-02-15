import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useUser();

  async function onLogout() {
    // TODO: Implement the logout handler
    // Step 1: Call await logout() to trigger the logout process from UserProvider
    // Step 2: Call setIsLoading(false) to stop showing the loading message and trigger redirect
  }

  useEffect(() => { onLogout(); }, []);

  if (isLoading) return <h3 style={{ padding: "24px" }}>Logging out...</h3>;
  return <Navigate to="/login" replace />;
}
