import { lazy, Suspense, useState } from "react";
import { Fallback } from "../../main";

const OrderTracking = lazy(() => import("./OrderTracking"));
const OrderHistory = lazy(() => import("./OrderHistory"));

const Buttons = [{ name: "Přehled" }, { name: "Historie" }];

type Page = "Přehled" | "Historie";

const OrderOverview = () => {
  const [page, setPage] = useState<Page>("Přehled");

  const handlePageChange = (page: Page) => {
    setPage(page);
  };

  return (
    <div className="grid w-full grid-cols-1 gap-2 md:m-auto md:w-[75rem] md:grid-cols-3">
      <div className="flex flex-col gap-2 rounded-lg bg-slate-900 p-2 text-white md:col-span-1">
        {Buttons.map(({ name }) => (
          <button
            key={name}
            className="rounded-lg border-2 border-white p-2 text-white"
            onClick={() => handlePageChange(name as Page)}
          >
            {name}
          </button>
        ))}
      </div>
      <div className="flex flex-col items-center gap-2 rounded-lg bg-slate-900 p-2 text-white md:col-span-2">
        {page === "Přehled" ? (
          <Suspense fallback={<Fallback />}>
            <OrderTracking />
          </Suspense>
        ) : (
          <Suspense fallback={<Fallback />}>
            <OrderHistory />
          </Suspense>
        )}
      </div>
    </div>
  );
};

export default OrderOverview;
