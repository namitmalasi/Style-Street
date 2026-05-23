import { Navigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

const PublicRoute = ({ children }) => {
  const { user } = useAuthStore();

  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoute;
