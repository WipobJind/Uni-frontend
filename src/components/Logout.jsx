import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserProvider";
import { Navigate } from "react-router-dom";

export default function Logout() {
  const [isLoading, setIsLoading] = useState(true);
  const { logout } = useUser();

  async function onLogout() {
    await logout();
    setIsLoading(false);
  }

  useEffect(() => { onLogout(); }, []);

  if (isLoading) return <h3 style={{ padding: "24px" }}>Logging out...</h3>;
  return <Navigate to="/login" replace />;
}
