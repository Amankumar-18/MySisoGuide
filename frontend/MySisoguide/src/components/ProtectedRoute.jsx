import { Navigate } from "react-router-dom";
import { getAccessToken, getUser } from "../utils/auth";

export default function ProtectedRoute({
  children,
  allowedRoles = [],
}) {
  const token = getAccessToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const user = getUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    console.log("Role:", user.role);
    console.log("Allowed:", allowedRoles);

    return <Navigate to="/" replace />;
  }

  return children;
}