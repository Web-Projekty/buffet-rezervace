import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";

const AccountDashboard = () => {
  const user: any = useAuthUser();
  const logout = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mb-[3rem] mt-[15rem]">
      {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />}
      <button
        className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default AccountDashboard;
