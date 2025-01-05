import { lazy, Suspense } from "react";
import { Fallback } from "../../../main";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Coins, History, LucideIcon, Menu, User } from "lucide-react";
import Button from "../../ui/Button";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { removeTokenExpiration } from "../login/login";

const AccountInformation = lazy(() => import("./AccountInformation"));
const Profile = lazy(() => import("./Profile"));
const OrderTracking = lazy(() => import("../../orders/OrderTracking"));
const OrderHistory = lazy(() => import("../../orders/OrderHistory"));
const Credits = lazy(() => import("./Credits"));

type DashboardButton = {
  icon?: LucideIcon;
  name: Page;
};

const Buttons: DashboardButton[] = [
  { icon: Menu, name: "Přehled" },
  { icon: History, name: "Historie" },
  { icon: User, name: "Profil" },
  { icon: Coins, name: "Kredity" },
];

type Page = "Přehled" | "Historie" | "Profil" | "Kredity";

const Dashboard = () => {
  const logout = useSignOut();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");

  const handlePageChange = (page: Page) => {
    setSearchParams({ page });
  };
  const page = (searchParams.get("page") as Page) || "Přehled";

  const handleLogout = () => {
    logout();
    removeTokenExpiration();
    navigate("/login");
    window.location.reload();
  };

  const DashboardContent = () => {
    switch (page) {
      case "Přehled":
        return (
          <Suspense fallback={<Fallback />}>
            <OrderTracking />
          </Suspense>
        );
      case "Historie":
        return (
          <Suspense fallback={<Fallback />}>
            <OrderHistory />
          </Suspense>
        );
      case "Profil":
        return (
          <Suspense fallback={<Fallback />}>
            <Profile />
          </Suspense>
        );
      case "Kredity":
        return (
          <Suspense fallback={<Fallback />}>
            <Credits />
          </Suspense>
        );
    }
  };

  return (
    <div className="grid w-full grid-cols-1 gap-2 md:m-auto md:h-[20rem] md:w-[75rem] md:grid-cols-3">
      <div className="flex min-h-[30rem] flex-col justify-between gap-2 rounded-lg bg-slate-900 p-2 text-white md:col-span-1">
        <Suspense fallback={<Fallback />}>
          <AccountInformation />
        </Suspense>
        <div className="flex flex-col gap-2">
          {Buttons.map(({ name, icon }) => {
            const Icon = icon;
            return (
              <button
                key={name + "button"}
                className="flex flex-row items-center justify-between rounded-lg border-2 border-white p-2 text-white"
                onClick={() => handlePageChange(name as Page)}
              >
                {Icon && <Icon size={24} />}
                {name}
              </button>
            );
          })}
        </div>
        <Button onClick={handleLogout}>Odhlásit se</Button>
      </div>

      <div className="flex w-auto flex-col rounded-lg bg-slate-900 p-4 text-white md:col-span-2">
        <DashboardContent />
      </div>
    </div>
  );
};

export default Dashboard;
