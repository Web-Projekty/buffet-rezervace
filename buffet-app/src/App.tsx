import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/cart/Cart";
import RouteScrollToTop from "./components/RouteScrollToTop";
import { useContext } from "react";
import { CartContext } from "./store/CartContext";

const App = () => {
  const { isOpen } = useContext(CartContext);
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white font-Lato dark:bg-slate-800">
      <Header />
      <RouteScrollToTop />
      {isOpen && <Cart />}
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
