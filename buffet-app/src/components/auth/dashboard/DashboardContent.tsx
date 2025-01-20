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
const PageNotFound = lazy(() => import("../../error/PageNotFound"));

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
            {isAdmin ? <PageNotFound /> : <OrderHistory />}
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
            {isAdmin ? <PageNotFound /> : <Credits />}
          </Suspense>
        );
      case "Systém":
        return (
          <Suspense fallback={<Fallback />}>
            {isAdmin ? <AdminSystem /> : <PageNotFound />}
          </Suspense>
        );
      case "Databáze":
        return (
          <Suspense fallback={<Fallback />}>
            {isAdmin ? <AdminDatabase /> : <PageNotFound />}
          </Suspense>
        );
      case "Provoz":
        return (
          <Suspense fallback={<Fallback />}>
            {isAdmin ? <AdminService /> : <PageNotFound />}
          </Suspense>
        );
      case "Platby":
        return (
          <Suspense fallback={<Fallback />}>
            {isAdmin ? <AdminPayments /> : <PageNotFound />}
          </Suspense>
        );
      case "Účetnictví":
        return (
          <Suspense fallback={<Fallback />}>
            {isAdmin ? <AdminAccounting /> : <PageNotFound />}
          </Suspense>
        );
      default:
        return <PageNotFound />;
    }
  };
  return renderContent();
};

export default DashboardContent;
