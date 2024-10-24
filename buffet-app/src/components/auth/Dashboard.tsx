import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import AccountInformation from "./AccountInformation";
import { User } from "../../types";
import UserOrderHistory from "../orders/UserOrderHistory";

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
    <div className="m-auto mb-[3rem] mt-[15rem] flex flex-col items-center justify-between gap-16 text-white md:w-[1200px] md:flex-row md:items-baseline md:gap-0">
      <AccountInformation user={user} />
      <UserOrderHistory list={user.orders} />
    </div>
  );
};

export default Dashboard;
