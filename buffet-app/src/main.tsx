import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import ItemList from "./components/menu/MenuList.tsx";
import RequireAuth from "./components/RequireAuth.tsx";
import MenuEdit from "./components/menu/MenuEdit.tsx";
import AdminOrderHistory from "./components/orders/AdminOrderHistory.tsx";
import Login from "./components/account/Login.tsx";
import Register from "./components/account/Register.tsx";
import AccountDashboard from "./components/account/AccountDashboard.tsx";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    //loader: () => import("./App.tsx"),
    children: [
      {
        path: "/",
        element: <ItemList />,
        //loader: () => import("./components/menu/MenuList.tsx"),
      },
      {
        path: "/menu",
        element: <ItemList />,
        //loader: () => import("./components/menu/MenuList.tsx"),
      },
      {
        path: "/menu/edit",
        element: (
          <RequireAuth requireAdmin={true}>
            <MenuEdit />
          </RequireAuth>
        ),
        //loader: () => import("./components/menu/MenuEdit.tsx"),
      },
      {
        path: "/alergeny",
        element: <ItemList />,
        //loader: () => import("./components/menu/MenuList.tsx"),
      },
      {
        path: "/objednavky",
        element: (
          <RequireAuth requireAdmin={true}>
            <AdminOrderHistory />
          </RequireAuth>
        ),
        //loader: () => import("./components/orders/AdminOrderHistory.tsx"),
      },
      {
        path: "/login",
        element: <Login />,
        //loader: () => import("./components/account/Login.tsx"),
      },
      {
        path: "/register",
        element: <Register />,
        //loader: () => import("./components/account/Register.tsx"),
      },
      {
        path: "/account",
        element: (
          <RequireAuth requireAdmin={false}>
            <AccountDashboard />
          </RequireAuth>
        ),
        //loader: () => import("./components/account/AccountDashboard.tsx"),
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
);
