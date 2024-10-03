import Order from "./Order";
import { usePaging } from "../../hooks/usePaging";
import { Order as OrderType } from "../../types";
import PagingButtons from "../PagingButtons";
import { AnimatePresence, motion } from "framer-motion";

const UserOrderHistory = ({ list }: { list: OrderType[] }) => {
  const {
    currentPage,
    totalPagesCount,
    totalListCount,
    displayedList,
    handleNextPage,
    handlePreviousPage,
  } = usePaging(list, 4);
  return (
    <div className="flex flex-col gap-2 md:w-[45rem]">
      <h1 className="text-2xl">Tvá historie objednávek ({totalListCount})</h1>
      <AnimatePresence>
        <ul className="flex flex-col gap-2">
          {displayedList.map((order) => (
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
        handleNextPage={handleNextPage}
        handlePreviousPage={handlePreviousPage}
      />
    </div>
  );
};

export default UserOrderHistory;
