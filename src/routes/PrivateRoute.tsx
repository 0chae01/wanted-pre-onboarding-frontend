import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const user = localStorage.getItem("token");
  if (user) {
    return <Navigate to="/todo" replace />;
  }
  return children;
};

export default PrivateRoute;
