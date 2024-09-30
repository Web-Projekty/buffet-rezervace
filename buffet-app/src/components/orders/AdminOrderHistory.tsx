import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { Order as OrderType } from "../../types";
import { dummyOrders } from "../../dummyData";
import { useEffect, useState } from "react";
import PagingButtons from "../PagingButtons";
import { isSameDay, parseISO } from "date-fns";
import AdminOrderFilter from "./AdminOrderFilter";

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

  const handleFilter = (e: React.ChangeEvent<any>) => {
    const { name, value, type, checked } = e.target;
    setOrdersFilter((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const applyFilters = () => {
    const filteredOrders = dummyOrders.filter((order) => {
      const matchesName = order.user?.fullName
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
    <div className="m-auto mb-[3rem] mt-[10rem] flex flex-col-reverse items-center justify-between gap-5 text-white md:mt-[15rem] md:w-[1200px] md:flex-row md:items-start">
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
      <AdminOrderFilter
        ordersFilter={ordersFilter}
        handleFilter={handleFilter}
        // handleSaveNewOrders={handleSaveNewOrders}
      />
    </div>
  );
};

export default AdminOrderHistory;
