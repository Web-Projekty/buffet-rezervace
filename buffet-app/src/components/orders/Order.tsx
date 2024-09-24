import { motion } from "framer-motion";
import { formatCurrency, formatDate } from "../../utils";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LuBadgeCheck, LuBadgeX, LuBadgeInfo } from "react-icons/lu";

type OrderType = {
  order: any;
};

const StatusBadge = ({
  status,
}: {
  status: "PENDING" | "PICKEDUP" | "NOTPICKEDUP";
}) => {
  return status === "PICKEDUP" ? (
    <LuBadgeCheck size={32} className="text-green-500" title="Vyzvednuto" />
  ) : status === "NOTPICKEDUP" ? (
    <LuBadgeX size={32} className="text-red-500" title="Nevyzvednuto" />
  ) : (
    <LuBadgeInfo
      size={32}
      className="text-yellow-300"
      title="Čeká na vyzvednutí"
    />
  );
};

const Order = ({ order }: OrderType) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="w-[45rem] rounded-lg bg-slate-900 p-4"
    >
      <div className="flex flex-row items-center justify-between gap-2 text-xl">
        <div className="flex flex-row gap-2 text-xl">
          <h2>Objednávka #{order.id}</h2>
          <p>{formatDate(order.date)}</p>
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
          {order.items.map((item: any) => (
            <li
              key={item.id}
              className="flex w-[240px] flex-row items-center justify-center gap-2"
            >
              <h3>{item.name}</h3>
              <div className="mt-4 flex-1 border-b-2 border-dotted border-white"></div>
              <p>{formatCurrency(item.price)}</p>
            </li>
          ))}
        </div>
        <hr />

        <div className="flex flex-row justify-between">
          <div className="flex w-[240px] flex-row items-center justify-center gap-2">
            <span>Celkem</span>
            <div className="mt-4 flex-1 border-b-2 border-dotted border-white"></div>
            <p>
              {formatCurrency(
                order.items.reduce(
                  (acc: number, item: any) => acc + item.price,
                  0,
                ),
              )}
            </p>
          </div>
          <div>
            <div className="flex flex-row items-center gap-2">
              <span>
                {order.status === "PENDING"
                  ? "Čeká na vyzvednutí"
                  : order.status === "PICKEDUP"
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
