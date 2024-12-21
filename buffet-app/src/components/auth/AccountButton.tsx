import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const AccountButton = () => {
  const location = useLocation();
  const isOnDashboard: boolean =
    location.pathname === "/account" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <Link
      to="/account"
      className={`rounded-full hover:cursor-pointer ${isOnDashboard ? "bg-white" : "bg-transparent"} p-2`}
    >
      <User size={36} />
    </Link>
  );
};

export default AccountButton;
