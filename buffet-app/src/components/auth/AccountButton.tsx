import { User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type AccountButtonProps = {
  type?: "navbar" | "menu";
  onClick?: () => void;
};

const AccountButton = ({ type = "navbar", onClick }: AccountButtonProps) => {
  const location = useLocation();
  const isOnDashboard: boolean =
    location.pathname === "/account" ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  if (type === "menu") {
    return (
      <Link
        to="/account"
        className="flex h-16 w-full items-center justify-center gap-2 bg-primary text-white"
        onClick={onClick}
      >
        <User size={24} />
        <span>Účet</span>
      </Link>
    );
  }

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
