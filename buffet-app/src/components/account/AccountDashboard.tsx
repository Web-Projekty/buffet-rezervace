import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import OrderHistory from "../orders/OrderHistory";
import AccountInformation from "./AccountInformation";
import { User } from "../../types";
import { dummyUser } from "../../dummyData";

const AccountDashboard = () => {
  //const user: User | null = useAuthUser();
  const user: User = dummyUser;

  return (
    <div className="mb-[3rem] mt-[15rem] flex flex-col justify-evenly gap-10 text-white md:flex-row md:gap-0">
      {/* {user.role === "admin" ? <AdminDashboard /> : <UserDashboard />} */}
      <AccountInformation user={user} />
      <OrderHistory user={user} />
    </div>
  );
};

export default AccountDashboard;
