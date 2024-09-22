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
    <div className="mb-[3rem] mt-[15rem] flex flex-col items-center justify-center text-white">
      {/* {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />} */}
      <h2 className="text-2xl font-bold">Welcome, {user.fullName}</h2>
      <p className="text-lg">Class: {user.class}</p>
      <p className="text-lg">Email: {user.email}</p>
      <p className="text-lg">Role: {user.role}</p>
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
