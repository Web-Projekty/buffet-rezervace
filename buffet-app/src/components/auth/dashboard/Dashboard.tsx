import { lazy, Suspense, useMemo } from "react";
import { Fallback } from "../../../main";
import { useSearchParams } from "react-router-dom";
import Button from "../../ui/Button";
import { removeDiacritics } from "../../utils/utils";
import { useUser } from "../../../hooks/useUser";
import DashboardContent from "./DashboardContent";

const AccountInformation = lazy(() => import("./AccountInformation"));
const DashboardButtons = lazy(() => import("./DashboardButtons"));

export type Page =
  | "Přehled"
  | "Historie"
  | "Profil"
  | "Kredity"
  | "Systém"
  | "Databáze"
  | "Provoz"
  | "Platby"
  | "Účetnictví";

const Dashboard = () => {
  const { isAdmin, logout } = useUser();
  const [searchParams, setSearchParams] = useSearchParams("Přehled");

  const handlePageChange = (page: Page) => {
    setSearchParams({ page: removeDiacritics(page) });
  };

  const handleLogout = () => {
    logout();
  };

  const page = useMemo(() => {
    const pageParam = searchParams.get("page");
    const normalizedPage = pageParam ? pageParam.toLowerCase() : "prehled";
    switch (normalizedPage) {
      case "prehled":
        return "Přehled";
      case "historie":
        return "Historie";
      case "profil":
        return "Profil";
      case "kredity":
        return "Kredity";
      case "system":
        return "Systém";
      case "databaze":
        return "Databáze";
      case "provoz":
        return "Provoz";
      case "platby":
        return "Platby";
      case "ucetnictvi":
        return "Účetnictví";
    }
  }, [searchParams]);

  return (
    <section className="grid w-full grid-cols-1 items-start gap-2 md:m-auto md:w-[75rem] md:grid-cols-3">
      <div className="flex min-h-[30rem] flex-col justify-between gap-2 rounded-lg bg-slate-900 p-2 text-white md:col-span-1">
        <Suspense fallback={<Fallback />}>
          <AccountInformation />
        </Suspense>
        <Suspense fallback={<Fallback />}>
          <DashboardButtons
            page={page}
            handlePageChange={handlePageChange}
            isAdmin={isAdmin}
          />
        </Suspense>
        <Button onClick={handleLogout}>Odhlásit se</Button>
      </div>

      <div className="flex min-h-[30rem] flex-col rounded-lg bg-slate-900 p-4 text-white md:col-span-2">
        <DashboardContent page={page} isAdmin={isAdmin} />
      </div>
    </section>
  );
};

export default Dashboard;
