import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { Order as OrderType } from "../../types";
import { dummyOrders } from "../../dummyData";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import PagingButtons from "../PagingButtons";
import { isSameDay, parseISO } from "date-fns";
import Input from "../../Input";

const AdminOrderHistory = () => {
  const [orders, setOrders] = useState<OrderType[]>(dummyOrders);
  const [ordersFilter, setOrdersFilter] = useState<{
    name: string;
    date: string;
    status: OrderType["status"] | "all";
  }>({
    name: "",
    //date: new Date().toISOString().split("T")[0],
    date: "",
    status: "all",
  });

  const {
    currentPage,
    totalPagesCount,
    totalListCount,
    displayedList,
    handleNextPage,
    handlePreviousPage,
  } = usePaging(orders, 4);

  const handleSaveNewOrders = () => {
    // Save new orders to the server
  };

  const handleFilter = (e) => {
    const { name, value, type, checked } = e.target;
    setOrdersFilter((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = () => {
    const filteredOrders = dummyOrders.filter((order) => {
      const matchesName = order.user?.name
        .toLowerCase()
        .includes(ordersFilter.name.toLowerCase());
      const matchesDate = ordersFilter.date
        ? isSameDay(parseISO(order.date), parseISO(ordersFilter.date))
        : true;
      const matchesStatus =
        order.status === ordersFilter.status || ordersFilter.status === "all";
      return matchesName && matchesDate && matchesStatus;
    });
    setOrders(filteredOrders);
  };

  useEffect(() => {
    applyFilters();
  }, [ordersFilter]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="m-auto mb-[3rem] mt-[10rem] flex flex-col-reverse items-center justify-between gap-5 text-white md:mt-[15rem] md:w-[1200px] md:flex-row md:items-start"
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl">Objednávky ({totalListCount})</h1>
        <ul className="flex flex-col gap-2">
          {displayedList.map((order) => (
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
      <div className="flex h-auto w-[320px] flex-col items-start justify-center gap-5 rounded-md bg-slate-900 p-10">
        <h2 className="text-2xl">Filtr</h2>
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="pickedup">Jméno</label>
          <Input
            type="text"
            name="name"
            id="name"
            value={ordersFilter.name}
            onChange={handleFilter}
            className="rounded-md p-1 text-black placeholder-slate-400"
          />
        </div>
        <div className="flex flex-row items-center gap-2">
          <label htmlFor="pickedup">Datum</label>
          <Input
            type="date"
            name="date"
            id="date"
            value={ordersFilter.date}
            onChange={handleFilter}
            className="rounded-md p-1 text-black placeholder-slate-400"
          />
        </div>
        <div className="flex flex-row gap-2">
          <label htmlFor="pickedup">Podle</label>
          <select
            name="status"
            id="status"
            className="rounded-md p-1 text-black"
            onChange={handleFilter}
          >
            <option value="all">Všechny</option>
            <option value="pickedup">Vyzvednuto</option>
            <option value="pending">Čeká na vyzvednutí</option>
            <option value="notpickedup">Nevyzvenduto</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminOrderHistory;
