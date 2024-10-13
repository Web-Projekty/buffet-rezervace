import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import RouteScrollToTop from "./components/RouteScrollToTop";
import CartModal from "./components/cart/CartModal";

const App = () => {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-white font-Lato dark:bg-slate-800">
      <Header />
      <RouteScrollToTop />
      <CartModal />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
