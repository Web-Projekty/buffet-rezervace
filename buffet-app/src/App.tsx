import { Outlet } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-Lato dark:bg-slate-700">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};

export default App;
