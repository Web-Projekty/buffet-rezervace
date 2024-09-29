import { motion } from "framer-motion";
import { formatCurrency, formatUnixDate } from "../../utils";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LuBadgeCheck, LuBadgeX, LuBadgeInfo } from "react-icons/lu";
import { Item, Order as OrderType } from "../../types";

const StatusBadge = ({ status }: { status: OrderType["status"] }) => {
  return status === "pickedup" ? (
    <LuBadgeCheck size={32} className="text-green-500" title="Vyzvednuto" />
  ) : status === "notpickedup" ? (
    <LuBadgeX size={32} className="text-red-500" title="Nevyzvednuto" />
  ) : (
    <LuBadgeInfo
      size={32}
      className="text-yellow-300"
      title="Čeká na vyzvednutí"
    />
  );
};

const Order = ({ order, isAdmin }: { order: OrderType; isAdmin?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className={`flex w-auto flex-col rounded-lg bg-slate-900 p-4 md:w-[45rem]`}
    >
      <div className="flex w-[380px] flex-row items-center justify-between text-xl md:w-auto">
        <div className="flex flex-row items-center gap-2 text-xl">
          <h2>Objednávka #{order.id}</h2>
          <p>{formatUnixDate(order.date)}</p>
          {isAdmin && order.user && (
            <p className="text-base">
              {order.user?.name}, {order.user?.class}, {order.user?.email}
            </p>
          )}
        </div>

        <div className="flex flex-row items-center">
          {!isOpen && <StatusBadge status={order.status} />}
          <MdKeyboardArrowLeft
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
        className="flex flex-col gap-3 overflow-hidden"
      >
        <div className="flex flex-col">
          {order.items.map((item: Item) => (
            <li
              key={item.id}
              className="flex w-[240px] flex-row items-center justify-center gap-2"
            >
              <h3>{item.name}</h3>
              <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
              <p>{formatCurrency(item.price)}</p>
            </li>
          ))}
        </div>

        <hr />

        <div className="flex flex-row justify-between">
          <div className="flex w-[240px] flex-row items-center justify-center gap-2">
            <span>Celkem</span>
            <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
            <p>
              {formatCurrency(
                order.items.reduce(
                  (acc: number, item: Item) => acc + item.price,
                  0,
                ),
              )}
            </p>
          </div>
          <div>
            <div className="flex flex-row items-center gap-2">
              <span>
                {order.status === "pending"
                  ? "Čeká na vyzvednutí"
                  : order.status === "pickedup"
                    ? "Vyzvednuto"
                    : "Nevyzvednuto"}
              </span>
              <StatusBadge status={order.status} />
            </div>
          </div>
        </div>
      </motion.ul>
    </motion.div>
  );
};

export default Order;
