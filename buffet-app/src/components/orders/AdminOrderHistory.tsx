import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { Order as OrderType } from "../../types";
import { dummyOrders } from "../../dummyData";
import { useState } from "react";
import { motion } from "framer-motion";
import PagingButtons from "../PagingButtons";
import Calendar from "./Calendar";

const AdminOrderHistory = () => {
  const [orderStatus, setOrderStatus] =
    useState<OrderType["status"]>("pickedup");
  const [orders, setOrders] = useState<OrderType[]>(dummyOrders);
  const {
    currentPage,
    totalPagesCount,
    totalListCount,
    displayedList,
    handleNextPage,
    handlePreviousPage,
  } = usePaging(orders, 4);

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-[3rem] mt-[15rem] flex flex-col items-center justify-center gap-5 text-white md:flex-row"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Objednávky ({totalListCount})</h1>
        <ul className="flex flex-col gap-2">
          {displayedList
            .filter((order) => order.status === orderStatus)
            .map((order) => (
              <Order key={order.id} order={order} isAdmin />
            ))}
        </ul>
        <PagingButtons
          currentPage={currentPage}
          totalPagesCount={totalPagesCount}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
        />
      </div>
      <div className="flex h-auto w-[250px] flex-col items-start justify-center gap-5 rounded-md bg-slate-900 p-10">
        <h2 className="text-2xl">Filtr</h2>
        <div>
          <label htmlFor="pickedup">Jméno</label>
          <input
            type="text"
            name="names"
            id="names"
            placeholder="Zadejte jméno"
            className="placeholder-slate-400"
            onChange={(e) => console.log(e.target.value)}
          />
        </div>
        <Calendar />
        <div className="flex flex-row gap-2">
          <label htmlFor="onlyPending">Čeká na vyzvednutí</label>
          <input type="checkbox" name="onlyPending" id="onlyPending" />
        </div>
        <div className="flex flex-row gap-2 bg-slate-900">
          <label htmlFor="onlyPending">Vyzvednuto</label>
          <input type="checkbox" name="onlyPickedUp" id="onlyPickedUp" />
        </div>
        <div className="flex flex-row gap-2 bg-slate-900">
          <label htmlFor="onlyNotPickedUp">Nevyzvednuto</label>
          <input type="checkbox" name="onlyNotPickedUp" id="onlyNotPickedUp" />
        </div>
      </div>
    </motion.div>
  );
};

export default AdminOrderHistory;
