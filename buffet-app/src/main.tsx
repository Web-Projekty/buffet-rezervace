import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { UserData } from "./hooks/useLogin.ts";
import Loading from "./components/Loading.tsx";

const Menu = lazy(() => import("./components/menu/Menu.tsx"));
const MenuEdit = lazy(() => import("./components/menu/editMenu/MenuEdit.tsx"));
const Login = lazy(() => import("./components/auth/login/Login.tsx"));
const Dashboard = lazy(() => import("./components/auth/Dashboard.tsx"));
const Allergens = lazy(() => import("./components/allergens/Allergens.tsx"));
const RequireAuth = lazy(() => import("./components/auth/RequireAuth.tsx"));
const CartPurchase = lazy(() => import("./components/cart/CartPurchase.tsx"));
const SuccessOrder = lazy(() => import("./components/orders/SuccessOrder.tsx"));
const AdminSettings = lazy(
  () => import("./components/auth/admin/AdminSettings.tsx"),
);
const OrderOverview = lazy(
  () => import("./components/orders/OrderOverview.tsx"),
);
const PageNotFound = lazy(() => import("./components/error/PageNotFound.tsx"));
const Kds = lazy(() => import("./components/kds/Kds.tsx"));
const ErrorBoundary = lazy(
  () => import("./components/error/ErrorBoundary.tsx"),
);

export const Fallback = () => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#1e293b",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Loading size={30} />
  </div>
);

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
      <Suspense fallback={<Fallback />}>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </Suspense>
    ),
    children: [
      {
        path: "/",
        index: true,
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <Menu />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/menu/edit",
        element: (
          <Suspense fallback={<Fallback />}>
            <RequireAuth requireAdmin={true}>
              <ErrorBoundary>
                <MenuEdit />
              </ErrorBoundary>
            </RequireAuth>
          </Suspense>
        ),
      },
      {
        path: "/alergeny",
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <Allergens />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/account",
        element: (
          <Suspense fallback={<Fallback />}>
            <RequireAuth requireAdmin={false} fallbackPath="/login">
              <ErrorBoundary>
                <Dashboard />
              </ErrorBoundary>
            </RequireAuth>
          </Suspense>
        ),
      },
      {
        path: "/settings",
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <AdminSettings />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <Login />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <CartPurchase />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/success-order",
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <SuccessOrder />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/order",
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <OrderOverview />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/*",
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <PageNotFound />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/page-not-found",
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <PageNotFound />
            </ErrorBoundary>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/kds",
    element: (
      <Suspense key="kds" fallback={<Fallback />}>
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
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <Kds />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "objednavky",
        index: true,
        element: (
          <Suspense fallback={<Fallback />}>
            <ErrorBoundary>
              <Kds />
            </ErrorBoundary>
          </Suspense>
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
