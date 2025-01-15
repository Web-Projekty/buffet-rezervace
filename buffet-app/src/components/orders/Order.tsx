import { motion } from "framer-motion";
import { OrderItems, Order as OrderType } from "../../types";
import { ChevronLeft } from "lucide-react";
import { useOrder } from "../../hooks/useOrder";
import OrderDetails from "./OrderDetails";

type OrderProps = {
  order: OrderType;
  items: OrderItems[];
};

const Order = ({ order, items }: OrderProps) => {
  const {
    color,
    isOpen,
    toggleOpen,
    status,
    statusText,
    pickUpDate,
    startTime,
    endTime,
  } = useOrder(order);

  const handleOpen = () => {
    toggleOpen();
  };

  const showPickUpDate =
    status === "storno" || status === "cancelled" || status === "done"
      ? false
      : true;

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative flex w-full flex-col rounded-lg bg-backgroundColor p-4 md:w-[45rem]`}
    >
      <div className="flex flex-row items-center justify-between">
        <div
          className={`absolute left-0 h-[64px] w-2 ${color} round-bl-lg rounded-bl-lg rounded-tl-lg`}
        ></div>
        <div className="flex w-full flex-row items-center gap-16">
          <h2 className="text-xl font-bold">#{order.pickUpId}</h2>
          {showPickUpDate && (
            <>
              <p className="text-base font-semibold">
                Stav: <span className="font-normal">{statusText}</span>
              </p>

              <p className="text-base text-descriptionColor">
                {pickUpDate + " " + startTime + " - " + endTime}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-row items-center">
          <ChevronLeft
            size={32}
            className={`${isOpen ? "-rotate-90" : null} cursor-pointer transition-transform duration-300 ease-in-out`}
            onClick={handleOpen}
          />
        </div>
      </div>
      <motion.ul
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { height: "auto", opacity: 1 },
          closed: { height: 0, opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
      >
        <OrderDetails order={order} items={items} />
      </motion.ul>
    </motion.div>
  );
};

export default Order;
