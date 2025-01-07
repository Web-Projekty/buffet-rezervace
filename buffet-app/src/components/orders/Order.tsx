import { motion } from "framer-motion";
import { Order as OrderType } from "../../types";
import { ChevronLeft } from "lucide-react";
import { useOrder } from "../../hooks/useOrder";
import OrderPrice from "./OrderPrice";
import OrderItems from "./OrderItems";
import Button from "../ui/Button";
import { lazy, Suspense } from "react";
import { Fallback } from "../../main";
import OrderDetails from "./OrderDetails";

type OrderProps = {
  order: OrderType;
};

const Order = ({ order }: OrderProps) => {
  const {
    color,
    isOpen,
    toggleOpen,
    status,
    statusText,
    handleStatus,
    dateCreated,
    pickUpDate,
    startTime,
    endTime,
  } = useOrder(order);

  const handleOpen = () => {
    toggleOpen();
  };

  const handleCancel = () => {
    handleStatus("storno");
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
      className={`relative flex w-auto flex-col rounded-lg bg-backgroundColor p-4 md:w-[45rem]`}
    >
      <div className="flex flex-row items-center justify-between">
        <div
          className={`absolute left-0 h-[64px] w-2 ${color} round-bl-lg rounded-bl-lg rounded-tl-lg`}
        ></div>
        <div className="flex w-full flex-row items-center gap-16">
          <h2 className="text-xl font-bold">#{order.pickUpId}</h2>

          <p className="text-base font-semibold">
            Stav: <span className="font-normal">{statusText}</span>
          </p>
          {showPickUpDate && (
            <p className="text-base">
              {pickUpDate + " " + startTime + " - " + endTime}
            </p>
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
        <OrderDetails items={order.items} dateCreated={dateCreated} />
      </motion.ul>
    </motion.div>
  );
};

export default Order;
