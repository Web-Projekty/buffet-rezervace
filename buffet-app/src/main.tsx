import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import Menu from "./components/menu/Menu.tsx";
import ErrorBoundary from "./components/error/ErrorBoundary.tsx";
import { UserData } from "./hooks/useLogin.ts";

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
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
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
          <Suspense fallback={<div>Loading...</div>}>
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
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Allergens />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/account",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
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
          <Suspense fallback={<div>Loading...</div>}>
            {/* <RequireAuth requireAdmin={true} fallbackPath="/login"> */}
            <ErrorBoundary>
              <AdminSettings />
            </ErrorBoundary>
            {/* </RequireAuth> */}
          </Suspense>
        ),
      },
      {
        path: "/login",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <Login />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <CartPurchase />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/success-order",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              {/*<RequireAuth requireAdmin={false} fallbackPath="/">*/}
              <SuccessOrder />
              {/*</RequireAuth>*/}
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/order",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              {/*<RequireAuth requireAdmin={false} fallbackPath="/">*/}
              <OrderOverview />
              {/*</RequireAuth>*/}
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/*",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ErrorBoundary>
              <PageNotFound />
            </ErrorBoundary>
          </Suspense>
        ),
      },
      {
        path: "/page-not-found",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
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
