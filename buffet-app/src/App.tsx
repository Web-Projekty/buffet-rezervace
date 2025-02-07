import { Outlet } from "react-router-dom";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import RouteScrollToTop from "./components/ui/RouteScrollToTop";
import { lazy, Suspense } from "react";
import { Fallback } from "./main";
import useCart from "./store/CartStore";
import { AnimatePresence } from "framer-motion";

const CartModal = lazy(() => import("./components/cart/CartModal"));

const App = () => {
  const { isOpen } = useCart();
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-slate-800 font-FiraSans">
      <Header />
      <RouteScrollToTop />
      <AnimatePresence>
        {isOpen && (
          <Suspense fallback={<Fallback />}>
            <CartModal />
          </Suspense>
        )}
      </AnimatePresence>
      <main className="mb-[3rem] mt-[10rem] flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default App;
