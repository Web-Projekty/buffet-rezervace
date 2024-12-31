import AccountInformation from "./AccountInformation";
import OrderOverview from "../orders/OrderOverview";

const Dashboard = () => {
  return (
    <div className="m-auto flex flex-col items-center justify-between gap-2 font-FiraSans text-white md:w-[1200px]">
      <AccountInformation />
      <OrderOverview />
    </div>
  );
};

export default Dashboard;
