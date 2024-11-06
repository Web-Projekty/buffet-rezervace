import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { Order as OrderType } from "../../types";
import PagingButtons from "../PagingButtons";
import { AnimatePresence, motion } from "framer-motion";
import { ordersPerPage } from "../../constants";
import useFetch from "../../hooks/useFetch";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import Loading from "../Loading";

type UserOrderHistoryProps = {
  list: OrderType[];
};

const UserOrderHistory = ({ list }: UserOrderHistoryProps) => {
  /* Test pro získání tokenu */
  // const token = useAuthHeader()?.split(" ")[1];

  // const { data, isLoading, error } = useFetch<OrderType[]>(
  //   "https://wlczak.vlastas.cc/backend/api",
  //   { requestType: "getOrders", token: token },
  // );

  const { currentPage, totalPagesCount, dataList, arrayOfPages, handlePage } =
    usePaging(list, ordersPerPage, "orderPage");

  // if (isLoading) {
  //   return <Loading size={30} />;
  // }

  // if (error) {
  //   return <div className="text-white">Chyba načítání dat ze serveru.</div>;
  // }

  return (
    <div className="flex flex-col gap-2 md:w-[45rem]">
      <h1 className="text-2xl">
        Tvá historie objednávek ({arrayOfPages.length})
      </h1>
      <AnimatePresence>
        <ul className="flex flex-col gap-2">
          {dataList.map((order) => (
            <motion.div
              key={order.id}
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Order key={order.id} order={order} />
            </motion.div>
          ))}
        </ul>
      </AnimatePresence>
      <PagingButtons
        currentPage={currentPage}
        totalPagesCount={totalPagesCount}
        listOfPages={arrayOfPages}
        handlePage={handlePage}
      />
    </div>
  );
};

export default UserOrderHistory;
