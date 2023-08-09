import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Todo from "./pages/Todo";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/signup",
        element: (
          <PrivateRoute>
            <SignUp />
          </PrivateRoute>
        ),
      },
      {
        path: "/signin",
        element: (
          <PrivateRoute>
            <SignIn />
          </PrivateRoute>
        ),
      },
      {
        path: "/todo",
        element: (
          <PublicRoute>
            <Todo />
          </PublicRoute>
        ),
      },
    ],
  },
]);

export default router;
