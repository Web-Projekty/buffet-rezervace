import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ItemList from "./components/ItemList";
import AccountDashboard from "./components/account/Dashboard";
import Login from "./components/account/Login";
import RequireAuth from "@auth-kit/react-router/RequireAuth";
import ReviewList from "./components/ReviewList";

const App = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-Lato dark:bg-slate-700">
      <Header />
      <Routes>
        <Route path="/" element={<ItemList />} />
        <Route path="/menu" element={<ItemList />} />
        <Route path="/recenze" element={<ReviewList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login />} />
        <Route
          path="/account"
          element={
            <RequireAuth fallbackPath="/login">
              <AccountDashboard />
            </RequireAuth>
          }
        />
        <Route path="*" element={<ItemList />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
