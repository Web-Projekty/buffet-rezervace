import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

const AccountDashboard = () => {
  const role = "admin";

  return role === "admin" ? <AdminDashboard /> : <UserDashboard />;
};

export default AccountDashboard;
