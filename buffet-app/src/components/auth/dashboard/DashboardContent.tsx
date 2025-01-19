import { lazy, Suspense } from "react";
import { Fallback } from "../../../main";
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

type DashboardContentProps = {
  page: Page;
  isAdmin: boolean;
};

const DashboardContent = ({ page, isAdmin }: DashboardContentProps) => {
  const renderContent = () => {
    switch (page) {
      case "Přehled":
        return (
          <Suspense fallback={<Fallback />}>
            {isAdmin ? <AdminOverview /> : <OrderTracking />}
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
      case "Systém":
        return (
          <Suspense fallback={<Fallback />}>
            <AdminSystem />
          </Suspense>
        );
      case "Databáze":
        return (
          <Suspense fallback={<Fallback />}>
            <AdminDatabase />
          </Suspense>
        );
      case "Provoz":
        return (
          <Suspense fallback={<Fallback />}>
            <AdminService />
          </Suspense>
        );
      case "Platby":
        return (
          <Suspense fallback={<Fallback />}>
            <AdminPayments />
          </Suspense>
        );
      case "Účetnictví":
        return (
          <Suspense fallback={<Fallback />}>
            <AdminAccounting />
          </Suspense>
        );
    }
  };
  return renderContent();
};

export default DashboardContent;
