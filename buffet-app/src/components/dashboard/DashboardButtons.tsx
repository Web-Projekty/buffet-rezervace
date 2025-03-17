import {
  Activity,
  Banknote,
  Coins,
  Database,
  HandCoins,
  History,
  LucideIcon,
  Menu,
  User,
} from "lucide-react";
import { Page } from "./Dashboard";

type DashboardButton = {
  icon?: LucideIcon;
  name: Page;
};

const userButtons: DashboardButton[] = [
  { icon: Menu, name: "Přehled" },
  { icon: History, name: "Historie" },
  { icon: User, name: "Profil" },
  { icon: Coins, name: "Kredity" },
];

const adminButtons: DashboardButton[] = [
  { icon: User, name: "Profil" },
  { icon: Menu, name: "Přehled" },
  { icon: Coins, name: "Systém" },
  { icon: Database, name: "Databáze" },
  { icon: Activity, name: "Provoz" },
  { icon: HandCoins, name: "Platby" },
  { icon: Banknote, name: "Účetnictví" },
];

type DashboardButtonsProps = {
  page: Page | undefined;
  handlePageChange: (page: Page) => void;
  isAdmin: boolean;
};

const DashboardButtons = ({
  page,
  handlePageChange,
  isAdmin,
}: DashboardButtonsProps) => {
  const Buttons = isAdmin ? adminButtons : userButtons;
  return (
    <div className="flex flex-col gap-2">
      {Buttons.map(({ name, icon }) => {
        const Icon = icon;
        return (
          <button
            key={name + "button"}
            className={
              "relative flex flex-row items-center justify-between rounded-lg border-2 border-slate-900 bg-backgroundColor p-2 text-white"
            }
            onClick={() => handlePageChange(name as Page)}
          >
            {page === name && (
              <div className="absolute left-0 top-0 h-full w-1 rounded-l-md bg-white" />
            )}
            {Icon && <Icon size={24} />}
            {name}
          </button>
        );
      })}
    </div>
  );
};

export default DashboardButtons;
