import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  if (loading) return null; // still checking the token on first load
  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return children;
}
