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
import Login from "./components/account/Login.tsx";
import Register from "./components/account/Register.tsx";
import Dashboard from "./components/account/Dashboard.tsx";
import Alergens from "./components/alergens/Alergens.tsx";
import { CartProvider } from "./store/CartContext.tsx";
import RequireAuth from "./components/account/RequireAuth.tsx";
import PageNotFound from "./components/error/PageNotFound.tsx";
import Cart from "./components/cart/Cart.tsx";

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
        index: true,
        element: <Menu />,
        //loader: () => import("./components/menu/MenuList.tsx"),
      },
      {
        path: "/menu/edit",
        element: (
          <RequireAuth requireAdmin={true} fallbackPath="/menu">
            <MenuEdit />
          </RequireAuth>
        ),
        //loader: () => import("./components/menu/MenuEdit.tsx"),
      },
      {
        path: "/alergeny",
        element: <Alergens />,
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
        element: <Login />,
        //loader: () => import("./components/account/Login.tsx"),
      },
      {
        path: "/register",
        element: <Register />,
        //loader: () => import("./components/account/Register.tsx"),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider store={store}>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  </StrictMode>,
);
