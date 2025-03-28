import { lazy, Suspense } from "react";
import { Fallback } from "../../main";
import { Page } from "./Dashboard";

const Profile = lazy(() => import("./Profile"));
const OrderTracking = lazy(() => import("./userContent/OrderTracking"));
const OrderHistory = lazy(() => import("./userContent/OrderHistory"));
const Credits = lazy(() => import("./userContent/Credits"));
const AdminOverview = lazy(() => import("./adminContent/AdminOverview"));
const AdminSystem = lazy(() => import("./adminContent/AdminSystem"));
const AdminDatabase = lazy(() => import("./adminContent/AdminDatabase"));
const AdminService = lazy(() => import("./adminContent/AdminService"));
const AdminPayments = lazy(() => import("./adminContent/AdminPayments"));
const AdminAccounting = lazy(() => import("./adminContent/AdminAccounting"));
const PageNotFound = lazy(() => import("../error/PageNotFound"));

type DashboardContentProps = {
  page: Page | undefined;
  isAdmin: boolean;
};

type Pages = {
  [key: string]: JSX.Element;
};

const adminPages: Pages = {
  Profil: <Profile />,
  Přehled: <AdminOverview />,
  Systém: <AdminSystem />,
  Databáze: <AdminDatabase />,
  Provoz: <AdminService />,
  Platby: <AdminPayments />,
  Účetnictví: <AdminAccounting />,
};

const userPages: Pages = {
  Přehled: <OrderTracking />,
  Profil: <Profile />,
  Historie: <OrderHistory />,
  Kredity: <Credits />,
};

const DashboardContent = ({ page, isAdmin }: DashboardContentProps) => {
  const renderContent = () => {
    return isAdmin
      ? adminPages[page as string] || <PageNotFound />
      : userPages[page as string] || <PageNotFound />;
  };

  return <Suspense fallback={<Fallback />}>{renderContent()}</Suspense>;
};

export default DashboardContent;
