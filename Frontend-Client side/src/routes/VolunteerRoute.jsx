import { Navigate } from "react-router";

const VolunteerRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const userString = localStorage.getItem("user");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  let user = null;
  try {
    user = userString ? JSON.parse(userString) : null;
  } catch (error) {
    console.error("Failed to parse user data from localStorage", error);
  }

  if (!user || (user.role !== "admin" && user.role !== "volunteer")) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default VolunteerRoute;