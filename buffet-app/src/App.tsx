import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ItemList from "./components/menu/ItemList";
import AccountDashboard from "./components/account/AccountDashboard";
import Login from "./components/account/Login";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import ReviewList from "./components/ReviewList";
import Register from "./components/account/Register";
import Cart from "./components/cart/Cart";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white font-Lato dark:bg-slate-800">
      <Header />
      <Cart />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<ItemList />} />
          <Route path="/menu" element={<ItemList />} />
          <Route path="/recenze" element={<ReviewList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <AccountDashboard />
              /*<RequireAuth fallbackPath="/login">
              </RequireAuth>*/
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
