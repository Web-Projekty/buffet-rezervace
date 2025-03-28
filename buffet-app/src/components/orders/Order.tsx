import { motion } from "framer-motion";
import { OrderItem, Order as OrderType, Variant } from "../../types";
import { ChevronLeft } from "lucide-react";
import { useOrder } from "../../hooks/useOrder";
import OrderDetails from "./OrderDetails";

type OrderProps = {
  order: OrderType;
  items: OrderItem[];
  variants: Variant[];
};

const Order = ({ order, items, variants }: OrderProps) => {
  const {
    color,
    isOpen,
    toggleOpen,
    status,
    statusText,
    pickUpDate,
    startTime,
    endTime,
    mappedItems,
    loading,
    dateCreated,
    handleStatus,
  } = useOrder(order, false, items, variants);

  const handleOpen = () => {
    toggleOpen();
  };

  const showPickUpDate =
    status === "storno" || status === "cancelled" || status === "done"
      ? false
      : true;

  return (
    <motion.article
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 50, opacity: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative flex w-full flex-col rounded-lg bg-backgroundColor p-4`}
    >
      <div className="flex flex-row items-center justify-between">
        <div
          className={`absolute left-0 top-0 w-2 ${color} h-full rounded-bl-lg rounded-tl-lg transition-all duration-300 ease-in-out`}
        ></div>
        <div className="flex w-full flex-row items-center gap-16">
          <h2 className="w-[3rem] text-xl font-bold">{order.pickUpId}</h2>
          <p className="w-[5rem] text-base md:w-[9rem]">{statusText}</p>
          {showPickUpDate && (
            <>
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
        className="overflow-hidden"
      >
        <OrderDetails
          dateCreated={dateCreated}
          mappedItems={mappedItems}
          status={status}
          handleStatus={handleStatus}
          loading={loading}
          paid={order.paid}
          payURL={order.thePayDetailsUrl}
        />
      </motion.ul>
    </motion.article>
  );
};

export default Order;
