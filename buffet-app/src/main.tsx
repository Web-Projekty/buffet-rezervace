import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import Menu from "./components/menu/Menu.tsx";
import MenuEdit from "./components/menu/MenuEdit.tsx";
import AdminOrderHistory from "./components/orders/AdminOrderHistory.tsx";
import Login from "./components/auth/login/Login.tsx";
import Register from "./components/auth/Register.tsx";
import Dashboard from "./components/auth/Dashboard.tsx";
import Alergens from "./components/allergens/Allergens.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import PageNotFound from "./components/error/PageNotFound.tsx";
import Cart from "./components/cart/Cart.tsx";
import ErrorBoundary from "./components/error/ErrorBoundary.tsx";

const store = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === "https:",
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    ),
    //loader: () => import("./App.tsx"),
    children: [
      {
        path: "/",
        index: true,
        element: (
          <ErrorBoundary>
            <Menu />
          </ErrorBoundary>
        ),
        //loader: () => import("./components/menu/MenuList.tsx"),
      },
      {
        path: "/menu/edit",
        element: (
          <RequireAuth requireAdmin={true} fallbackPath="/menu">
            <ErrorBoundary>
              <MenuEdit />
            </ErrorBoundary>
          </RequireAuth>
        ),
        //loader: () => import("./components/menu/MenuEdit.tsx"),
      },
      {
        path: "/alergeny",
        element: (
          <ErrorBoundary>
            <Alergens />
          </ErrorBoundary>
        ),
        //loader: () => import("./components/menu/MenuList.tsx"),
      },
      {
        path: "/objednavky",
        element: (
          <RequireAuth requireAdmin={true} fallbackPath="/login">
            <AdminOrderHistory />
          </RequireAuth>
        ),
        //loader: () => import("./components/orders/AdminOrderHistory.tsx"),
      },
      {
        path: "/account",
        element: (
          <RequireAuth requireAdmin={false} fallbackPath="/login">
            <Dashboard />
          </RequireAuth>
        ),
        //loader: () => import("./components/account/AccountDashboard.tsx"),
      },
      {
        path: "/login",
        element: (
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        ),
        //loader: () => import("./components/account/Login.tsx"),
      },
      {
        path: "/register",
        element: (
          <ErrorBoundary>
            <Register />
          </ErrorBoundary>
        ),
        //loader: () => import("./components/account/Register.tsx"),
      },
      {
        path: "/cart",
        element: (
          <ErrorBoundary>
            <Cart />
          </ErrorBoundary>
        ),
      },
      {
        path: "/*",
        element: (
          <ErrorBoundary>
            <PageNotFound />
          </ErrorBoundary>
        ),
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
