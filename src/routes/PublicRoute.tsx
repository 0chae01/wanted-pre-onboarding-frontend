import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("token");
  if (!user) {
    return <Navigate to="/signin" replace />;
  }
  return children;
};

export default PublicRoute;
