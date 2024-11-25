import KdsHeader from "../kds/KdsHeader";
import KdsOrders from "./KdsOrders";

const Kds = () => {
  return (
    <div className="flex min-h-screen w-full flex-col gap-2 overflow-x-hidden bg-slate-800 font-FiraSans">
      <KdsHeader />
      <KdsOrders />
    </div>
  );
};

export default Kds;
