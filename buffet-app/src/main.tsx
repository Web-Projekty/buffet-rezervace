import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import Menu from "./components/menu/Menu.tsx";
import ErrorBoundary from "./components/error/ErrorBoundary.tsx";
import { UserData } from "./hooks/useLogin.ts";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import MenuEdit from "./components/menu/editMenu/MenuEdit.tsx";
import Allergens from "./components/allergens/Allergens.tsx";
import Dashboard from "./components/auth/Dashboard.tsx";
import AdminSettings from "./components/auth/admin/AdminSettings.tsx";
import Login from "./components/auth/login/Login.tsx";
import CartPurchase from "./components/cart/CartPurchase.tsx";
import SuccessOrder from "./components/orders/SuccessOrder.tsx";
import OrderOverview from "./components/orders/OrderOverview.tsx";
import PageNotFound from "./components/error/PageNotFound.tsx";
import Kds from "./components/kds/Kds.tsx";

// const MenuEdit = lazy(() => import("./components/menu/editMenu/MenuEdit.tsx"));
// const Login = lazy(() => import("./components/auth/login/Login.tsx"));
// const Dashboard = lazy(() => import("./components/auth/Dashboard.tsx"));
// const Allergens = lazy(() => import("./components/allergens/Allergens.tsx"));
// const RequireAuth = lazy(() => import("./components/auth/RequireAuth.tsx"));
// const CartPurchase = lazy(() => import("./components/cart/CartPurchase.tsx"));
// const SuccessOrder = lazy(() => import("./components/orders/SuccessOrder.tsx"));
// const AdminSettings = lazy(
//   () => import("./components/auth/admin/AdminSettings.tsx"),
// );
// const OrderOverview = lazy(
//   () => import("./components/orders/OrderOverview.tsx"),
// );
// const PageNotFound = lazy(() => import("./components/error/PageNotFound.tsx"));
// const Kds = lazy(() => import("./components/kds/Kds.tsx"));

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
      <Suspense
        fallback={
          <div
            style={{
              backgroundColor: "#1e293b",
              height: "100vh",
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Loading...
          </div>
        }
      >
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Suspense>
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
          /* <RequireAuth requireAdmin={true} fallbackPath="/login"> */
          <ErrorBoundary>
            <AdminSettings />
          </ErrorBoundary>
          /* </RequireAuth> */
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
            <CartPurchase />
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
        path: "/order",
        element: (
          <ErrorBoundary>
            {/*<RequireAuth requireAdmin={false} fallbackPath="/">*/}
            <OrderOverview />
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
      <Suspense key="kds" fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <RequireAuth requireAdmin={true}>
            <Kds />
          </RequireAuth>
        </ErrorBoundary>
      </Suspense>
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
