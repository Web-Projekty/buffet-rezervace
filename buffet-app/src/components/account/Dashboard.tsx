import { useState } from "react";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const AccountDashboard = () => {
  const [admin, setAdmin] = useState(false);
  return admin ? <AdminDashboard /> : <UserDashboard />;
};

export default AccountDashboard;
