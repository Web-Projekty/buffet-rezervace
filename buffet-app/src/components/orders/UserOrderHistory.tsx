import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { Order as OrderType } from "../../types";
import PagingButtons from "../PagingButtons";
import { AnimatePresence } from "framer-motion";
import { FETCH_URL, ORDERS_PER_PAGE } from "../../constants";
import { useFetch } from "../../hooks/useFetch";
import Loading from "../Loading";
import { useUser } from "../../hooks/useUser";

type OrderData = {
  data: OrderType[];
};

const UserOrderHistory = () => {
  const { token } = useUser();

  const { data, isLoading, error } = useFetch<OrderData>(
    FETCH_URL,
    { requestType: "getOrders", token: token },
    { data: [] },
    [token],
  );

  const { currentPage, totalPagesCount, dataList, arrayOfPages, handlePage } =
    usePaging<OrderType>(data?.data, ORDERS_PER_PAGE, "orderPage");

  if (isLoading) {
    return <Loading size={30} />;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="flex w-auto flex-col gap-2">
      <h1 className="text-2xl">Tvá historie objednávek ({dataList.length})</h1>
      <AnimatePresence>
        <ul className="flex flex-col gap-2">
          {dataList.map((order) => (
            <Order key={order.id} order={order} />
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
