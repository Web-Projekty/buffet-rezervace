import { lazy, Suspense, useMemo } from "react";
import { Fallback } from "../../../main";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Coins, History, LucideIcon, Menu, User } from "lucide-react";
import Button from "../../ui/Button";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import { removeTokenExpiration } from "../login/login";

const AccountInformation = lazy(() => import("./AccountInformation"));
const Profile = lazy(() => import("./Profile"));
const OrderTracking = lazy(() => import("./OrderTracking"));
const OrderHistory = lazy(() => import("./OrderHistory"));
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

const DashboardContent = ({ page }: { page: Page }) => {
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

const Dashboard = () => {
  const logout = useSignOut();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("Přehled");

  const handlePageChange = (page: Page) => {
    setSearchParams({ page });
  };

  const page = useMemo(
    () => (searchParams.get("page") as Page) || "Přehled",
    [searchParams],
  );

  const handleLogout = () => {
    logout();
    removeTokenExpiration();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="grid w-full grid-cols-1 gap-2 md:m-auto md:w-[75rem] md:grid-cols-3">
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
                className={
                  "flex flex-row items-center justify-between rounded-lg border-2 border-white p-2 text-white" +
                  (page === name ? " bg-backgroundColor" : "")
                }
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
        <DashboardContent page={page} />
      </div>
    </div>
  );
};

export default Dashboard;
