import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminProtectedRoute = ({ children }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading === false) {
    if (!isAuthenticated) {
      return <Navigate to="/" replace />;
    } else if (user.role !== "Admin") {
      return <Navigate to="/" replace />;
    }
    return children;
  }
};

export default AdminProtectedRoute;
