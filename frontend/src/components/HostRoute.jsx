import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function HostRoute({ children }) {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  if (loading) return null;
  if (!isLoggedIn || !isAdmin) return <Navigate to="/login" replace />;

  return children;
}
