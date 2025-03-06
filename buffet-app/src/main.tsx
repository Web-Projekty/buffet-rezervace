import { lazy, StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { UserData } from "./hooks/useLogin.ts";
import Loading from "./components/ui/Loading.tsx";
import ErrorBoundary from "./components/error/ErrorBoundary.tsx";
import RequireAuth from "./components/auth/RequireAuth.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Menu = lazy(() => import("./components/menu/Menu.tsx"));
const MenuEdit = lazy(() => import("./components/menu/editMenu/MenuEdit.tsx"));
const Login = lazy(() => import("./components/auth/login/Login.tsx"));
const Register = lazy(() => import("./components/auth/register/Register.tsx"));
const Dashboard = lazy(
  () => import("./components/auth/dashboard/Dashboard.tsx"),
);
const Allergens = lazy(() => import("./components/allergens/Allergens.tsx"));
const CartPurchase = lazy(
  () => import("./components/cart/purchase/CartPurchase.tsx"),
);
const SuccessOrder = lazy(() => import("./components/orders/SuccessOrder.tsx"));
const PageNotFound = lazy(() => import("./components/error/PageNotFound.tsx"));
const Kds = lazy(() => import("./components/kds/Kds.tsx"));

export const Fallback = () => (
  <div
    style={{
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
      <ErrorBoundary fullPage>
        <Suspense fallback={<Fallback />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    ),
    errorElement: <PageNotFound />,
    children: [
      {
        path: "/",
        index: true,
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
              <Menu />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/menu/edit",
        element: (
          <RequireAuth requireAdmin={true}>
            <ErrorBoundary>
              <Suspense fallback={<Fallback />}>
                <MenuEdit />
              </Suspense>
            </ErrorBoundary>
          </RequireAuth>
        ),
      },
      {
        path: "/alergeny",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
              <Allergens />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/account",
        element: (
          <RequireAuth requireAdmin={false} fallbackPath="/login">
            <ErrorBoundary>
              <Suspense fallback={<Fallback />}>
                <Dashboard />
              </Suspense>
            </ErrorBoundary>
          </RequireAuth>
        ),
      },
      {
        path: "/login",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
              <Login />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/register",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
              <Register />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/cart",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
              <CartPurchase />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/return",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
              <SuccessOrder />
            </Suspense>
          </ErrorBoundary>
        ),
      },
      {
        path: "/*",
        element: (
          <ErrorBoundary>
            <Suspense fallback={<Fallback />}>
              <PageNotFound />
            </Suspense>
          </ErrorBoundary>
        ),
      },
    ],
  },
  {
    path: "/kds",
    element: (
      <RequireAuth requireAdmin={true}>
        <ErrorBoundary>
          <Suspense key="kds" fallback={<Fallback />}>
            <Kds />
          </Suspense>
        </ErrorBoundary>
      </RequireAuth>
    ),
  },
]);

const container = document.getElementById("root");
if (!container) {
  throw new Error("Container not found");
}

const queryClient = new QueryClient();
const root = createRoot(container);

root.render(
  <StrictMode>
    <AuthProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </StrictMode>,
);
