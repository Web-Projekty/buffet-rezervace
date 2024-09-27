import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Cart from "./components/cart/Cart";
import RouteScrollToTop from "./components/RouteScrollToTop";

const App = () => {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white font-Lato dark:bg-slate-800">
      <Header />
      <RouteScrollToTop />
      <Cart />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
