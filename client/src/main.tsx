import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import SignUp from "./routes/Signup.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.tsx";
import Login from "./routes/Login.tsx";
import { PublicRoute } from "./utils/PublicRoute.tsx";
import { PrivateRoute } from "./utils/PrivateRoute.tsx";

const router = createBrowserRouter([
  { element: <PrivateRoute />, children: [{ path: "/", element: <Home /> }] },
  {
    element: <PublicRoute />,
    children: [
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
