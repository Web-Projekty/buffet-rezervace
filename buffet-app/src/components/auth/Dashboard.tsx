import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AccountInformation from "./AccountInformation";
import { User } from "../../types";
import UserOrderHistory from "../orders/UserOrderHistory";
import { dummyOrders } from "../../dummyData";

const Dashboard = () => {
  const user: User = useAuthUser()!;
  // const user: User = dummyUser;
  /*const header = useAuthHeader();
  console.log(header?.split(" ")[1]);*/

  // useEffect(() => {
  //   if (isTokenExpired()) {
  //     logout();
  //     navigate("/login");
  //     return;
  //   }
  // }, []);

  return (
    <div className="m-auto mt-14 flex flex-col items-center justify-between gap-16 text-white md:mt-24 md:w-[1200px] md:flex-row md:items-baseline md:gap-0 xl:mt-28">
      <AccountInformation user={user} />
      <UserOrderHistory list={dummyOrders} />
    </div>
  );
};

export default Dashboard;
