import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ToDo from "./pages/ToDo";

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
        element: <SignUp />,
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      {
        path: "/todo",
        element: <ToDo />,
      },
    ],
  },
]);

export default router;
