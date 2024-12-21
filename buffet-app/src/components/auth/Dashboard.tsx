import AccountInformation from "./AccountInformation";
import UserOrderHistory from "../orders/UserOrderHistory";

const Dashboard = () => {
  return (
    <div className="m-auto mt-14 flex flex-col items-center justify-between gap-16 font-FiraSans text-white md:mt-24 md:w-[1200px] md:flex-row md:items-baseline md:gap-0 xl:mt-28">
      <AccountInformation />
      <UserOrderHistory />
    </div>
  );
};

export default Dashboard;
