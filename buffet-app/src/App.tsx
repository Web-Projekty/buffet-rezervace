import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import FoodList from "./components/FoodList";
import AccountDashboard from "./components/account/Dashboard";
import Login from "./components/account/Login";
import RequireAuth from "@auth-kit/react-router/RequireAuth";

const App = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-Lato dark:bg-slate-700">
      <Header />
      <Routes>
        <Route path="/" element={<FoodList />} />
        <Route path="/menu" element={<FoodList />} />
        <Route path="/about" element={<FoodList />} />
        <Route path="/reviews" element={<FoodList />} />
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
        <Route path="*" element={<FoodList />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
