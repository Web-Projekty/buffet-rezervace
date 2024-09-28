import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AccountInformation from "./AccountInformation";
import { User } from "../../types";
import { dummyUser } from "../../dummyData";
import UserOrderHistory from "../orders/UserOrderHistory";

const AccountDashboard = () => {
  //const user: User | null = useAuthUser();
  const user: User = dummyUser;

  return (
    <div className="m-auto mb-[3rem] mt-[15rem] flex flex-col items-center justify-between gap-16 text-white md:w-[1200px] md:flex-row md:items-baseline md:gap-0">
      {/* {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />} */}
      <AccountInformation user={user} />
      <UserOrderHistory list={user.orders} />
    </div>
  );
};

export default AccountDashboard;
