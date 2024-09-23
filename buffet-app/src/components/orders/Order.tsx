import { motion } from "framer-motion";
import { formatCurrency } from "../../utils";
import { useState } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowLeft } from "react-icons/md";

type OrderType = {
  order: any;
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
      onClick={handleOpen}
    >
      <div className="flex flex-row items-center justify-between gap-2 text-xl">
        <div className="flex flex-row gap-2 text-xl">
          <h2>Objednávka #{order.id}</h2>
          <p>{order.date}</p>
        </div>

        {isOpen ? (
          <MdKeyboardArrowDown size={32} />
        ) : (
          <MdKeyboardArrowLeft size={32} />
        )}
      </div>

      {isOpen ? (
        <ul className="flex flex-col gap-2">
          <div className="flex flex-col">
            {order.items.map((item: any) => (
              <li key={item.id} className="flex flex-row gap-2">
                <h3>{item.name}</h3>
                <p>{formatCurrency(item.price)}</p>
              </li>
            ))}
          </div>
          <hr />

          <div className="flex flex-row gap-2">
            <span>Celkem</span>
            {formatCurrency(
              order.items.reduce(
                (acc: number, item: any) => acc + item.price,
                0,
              ),
            )}
          </div>
        </ul>
      ) : null}
    </motion.div>
  );
};

export default Order;
