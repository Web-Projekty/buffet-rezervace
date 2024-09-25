import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ItemList from "./components/menu/ItemList";
import AccountDashboard from "./components/account/AccountDashboard";
import Login from "./components/account/Login";
import ReviewList from "./components/ReviewList";
import Register from "./components/account/Register";
import Cart from "./components/cart/Cart";
import RequireAuth from "./components/RequireAuth";
import OrderHistory from "./components/orders/OrderHistory";
import AdminOrderHistory from "./components/orders/AdminOrderHistory";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white font-Lato dark:bg-slate-800">
      <Header />
      <Cart />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/menu" element={<ItemList />} />
          <Route
            path="/menu/edit"
            element={
              <RequireAuth requireAdmin={true}>
                <Register />
              </RequireAuth>
            }
          />
          <Route path="/alergeny" element={<ItemList />} />
          <Route path="/objednavky" element={<AdminOrderHistory />} />
          <Route path="/recenze" element={<ReviewList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <RequireAuth requireAdmin={false}>
                <AccountDashboard />
              </RequireAuth>
            }
          />

          <Route path="*" element={<ItemList />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
