import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FoodList from "./components/FoodList.jsx";
import ReviewList from "./components/ReviewList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <FoodList />,
      },
      {
        path: "/menu",
        element: <FoodList />,
      },
      {
        path: "/about",
        element: <FoodList />,
      },
      {
        path: "/reviews",
        element: <ReviewList />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
