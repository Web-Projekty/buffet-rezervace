import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import Menu from "./components/menu/Menu.tsx";
import MenuEdit from "./components/menu/MenuEdit.tsx";
import Login from "./components/auth/login/Login.tsx";
import Dashboard from "./components/auth/Dashboard.tsx";
import Allergens from "./components/allergens/Allergens.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import PageNotFound from "./components/error/PageNotFound.tsx";
import Cart from "./components/cart/Cart.tsx";
import ErrorBoundary from "./components/error/ErrorBoundary.tsx";
import SuccessOrder from "./components/orders/SuccessOrder.tsx";
import { UserData } from "./hooks/useLogin.ts";
import Kds from "./components/kds/Kds.tsx";
import AdminSettings from "./components/auth/admin/AdminSettings.tsx";

const store = createStore<UserData>({
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
      },
      {
        path: "/menu/edit",
        element: (
          <RequireAuth requireAdmin={true}>
            <ErrorBoundary>
              <MenuEdit />
            </ErrorBoundary>
          </RequireAuth>
        ),
      },
      {
        path: "/alergeny",
        element: (
          <ErrorBoundary>
            <Allergens />
          </ErrorBoundary>
        ),
      },
      {
        path: "/account",
        element: (
          <RequireAuth requireAdmin={false} fallbackPath="/login">
            <ErrorBoundary>
              <Dashboard />
            </ErrorBoundary>
          </RequireAuth>
        ),
      },
      {
        path: "/settings",
        element: (
          //<RequireAuth requireAdmin={true} fallbackPath="/login">
          <ErrorBoundary>
            <AdminSettings />
          </ErrorBoundary>
          //</RequireAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <ErrorBoundary>
            <Login />
          </ErrorBoundary>
        ),
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
        path: "/success-order",
        element: (
          <ErrorBoundary>
            {/*<RequireAuth requireAdmin={false} fallbackPath="/">*/}
            <SuccessOrder />
            {/*</RequireAuth>*/}
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
      {
        path: "/page-not-found",
        element: (
          <ErrorBoundary>
            <PageNotFound />
          </ErrorBoundary>
        ),
      },
    ],
  },
  {
    path: "/kds",
    element: (
      <ErrorBoundary>
        <RequireAuth requireAdmin={true}>
          <Kds />
        </RequireAuth>
      </ErrorBoundary>
    ),
    children: [
      {
        path: "souhrn",
        element: (
          <ErrorBoundary>
            <Kds />
          </ErrorBoundary>
        ),
      },
      {
        path: "objednavky",
        index: true,
        element: (
          <ErrorBoundary>
            <Kds />
          </ErrorBoundary>
        ),
      },
      {
        path: "uprava-menu",
        element: (
          <ErrorBoundary>
            <Kds />
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
