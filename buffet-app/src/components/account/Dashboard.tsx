import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import OrderHistory from "../orders/OrderHistory";

const AccountDashboard = () => {
  const user: any = useAuthUser();
  const logout = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="mb-[3rem] mt-[15rem] flex flex-col justify-evenly gap-10 text-white md:flex-row md:gap-0">
      {/* {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />} */}
      <div className="flex flex-col gap-5">
        <div>
          <h2 className="text-2xl font-bold">User</h2>
          <p className="text-lg">Email: user@mail.com</p>
          <p className="text-lg">Třída: 1.Y</p>
        </div>

        <button
          className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>

      <OrderHistory />
    </div>
  );
};

export default AccountDashboard;
