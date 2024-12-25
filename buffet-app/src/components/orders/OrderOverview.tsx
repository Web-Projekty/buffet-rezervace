import { useState } from "react";
import OrderTracking from "./OrderTracking";
import OrderHistory from "./OrderHistory";

const Buttons = [{ name: "Přehled" }, { name: "Historie" }];

type Page = "Přehled" | "Historie";

const OrderOverview = () => {
  const [page, setPage] = useState<Page>("Přehled");

  const handlePageChange = (page: Page) => {
    setPage(page);
  };

  return (
    <div className="m-auto grid w-[75rem] grid-cols-3 gap-2">
      <div className="col-span-1 flex flex-col gap-2 rounded-lg bg-slate-900 p-2 text-white">
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
      <div className="col-span-2 flex flex-col items-center gap-2 rounded-lg bg-slate-900 p-2 text-white">
        {page === "Přehled" ? <OrderTracking /> : <OrderHistory />}
      </div>
    </div>
  );
};

export default OrderOverview;
