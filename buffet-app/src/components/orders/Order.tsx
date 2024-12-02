import { AnimatePresence, motion } from "framer-motion";
import { Order as OrderType } from "../../types";
import { scaleUpAnimation } from "../../animations";
import { ChevronLeft } from "lucide-react";
import { useOrder } from "../../hooks/useOrder";
import { statusToText } from "../../utils";

type OrderProps = {
  order: OrderType;
  isAdmin?: boolean;
};

type CancelButtonProps = {
  handleCancel: () => void;
};

type PickupButtonProps = {
  handlePickup: () => void;
};

type AnimationWrapperProps = {
  children: React.ReactNode;
  keyValue: string;
};

const CancelButton = ({ handleCancel }: CancelButtonProps) => {
  return (
    <motion.button
      {...scaleUpAnimation()}
      className="rounded-md border bg-red-500 p-2 text-white hover:bg-red-700"
      onClick={handleCancel}
    >
      Zrušit
    </motion.button>
  );
};

const PickupButton = ({ handlePickup }: PickupButtonProps) => {
  return (
    <motion.button
      {...scaleUpAnimation()}
      className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
      onClick={handlePickup}
    >
      Vyzvednuto
    </motion.button>
  );
};

const AnimationWrapper = ({ children, keyValue }: AnimationWrapperProps) => {
  return (
    <motion.div key={keyValue} {...scaleUpAnimation()}>
      {children}
    </motion.div>
  );
};

const Order = ({ order, isAdmin }: OrderProps) => {
  const { color, isOpen, toggleOpen, status, handleStatus } = useOrder(order);

  const handleOpen = () => {
    toggleOpen();
  };

  const handleCancel = () => {
    handleStatus("notpickedup");
  };

  const handlePickup = () => {
    handleStatus("pickedup");
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative flex w-auto flex-col rounded-lg bg-slate-900 p-4 md:w-[45rem]`}
    >
      <div className="flex flex-row items-center justify-between text-xl">
        <div
          className={`absolute left-0 h-[64px] w-2 ${color} round-bl-lg rounded-tl-lg`}
        ></div>
        <div className="flex flex-row items-center gap-2 text-xl">
          <h2 className="font-bold">#{order.id}</h2>
          {/*<p>{formatUnixDate(order.date)}</p>*/}
          {isAdmin && order.userId && (
            <p className="text-base">{order.userId}</p>
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
        className="flex flex-col gap-3 overflow-hidden"
      >
        <div className="flex flex-col">
          {/*order.items.map((item) => (
            <li
              key={item.id}
              className="flex w-[240px] flex-row items-center justify-center gap-2"
            >
              <h3>{item.name}</h3>
              <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
              <p>{formatCurrency(item.price)}</p>
            </li>
          ))*/}
        </div>

        <hr />

        <div className="flex flex-col justify-between md:flex-row">
          <div className="flex w-[240px] flex-row items-center justify-center gap-2 font-bold">
            <span>Celkem</span>
            <div className="mt-3 flex-1 border-b-2 border-dotted border-white"></div>
            <p>
              {/*formatCurrency(
                order.items.reduce(
                  (acc: number, item: MenuItem) => acc + item.price,
                  0,
                ),
              )*/}
            </p>
          </div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <AnimatePresence>
              {status === "pending" && isAdmin && (
                <PickupButton handlePickup={handlePickup} />
              )}
              {status === "pending" && (
                <CancelButton
                  key={"cancel-button"}
                  handleCancel={handleCancel}
                />
              )}
            </AnimatePresence>

            <AnimatePresence>
              <AnimationWrapper keyValue="status-button">
                <div className="flex flex-row items-center gap-2">
                  <span>{statusToText(status)}</span>
                </div>
              </AnimationWrapper>
            </AnimatePresence>
          </div>
        </div>
      </motion.ul>
    </motion.div>
  );
};

export default Order;
