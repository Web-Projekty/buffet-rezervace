import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RouteScrollToTop from "./components/RouteScrollToTop";
import CartModal from "./components/cart/CartModal";
import { AnimatePresence } from "framer-motion";
import useCart from "./store/CartZustand";

const App = () => {
  const { isOpen, handleOpenCart } = useCart();
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white font-Lato dark:bg-slate-800">
      <Header />
      <RouteScrollToTop />
      <AnimatePresence>
        {isOpen && <CartModal setIsOpen={handleOpenCart} />}
      </AnimatePresence>
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
