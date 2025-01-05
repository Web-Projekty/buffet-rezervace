import { AnimatePresence, motion } from "framer-motion";
import { Order as OrderType } from "../../types";
import { scaleUpAnimation } from "../../animations";
import { ChevronLeft } from "lucide-react";
import { useOrder } from "../../hooks/useOrder";
import OrderPrice from "./OrderPrice";
import OrderItems from "./OrderItems";
import Button from "../ui/Button";

type OrderProps = {
  order: OrderType;
};

type AnimationWrapperProps = {
  children: React.ReactNode;
  keyValue: string;
  className?: string;
};

const AnimationWrapper = ({
  children,
  keyValue,
  className,
}: AnimationWrapperProps) => {
  return (
    <motion.div key={keyValue} className={className} {...scaleUpAnimation()}>
      {children}
    </motion.div>
  );
};

const Order = ({ order }: OrderProps) => {
  const { color, isOpen, toggleOpen, status, statusText, handleStatus } =
    useOrder(order);

  const handleOpen = () => {
    toggleOpen();
  };

  const handleCancel = () => {
    handleStatus("storno");
  };

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative flex w-auto flex-col rounded-lg bg-backgroundColor p-4 md:w-[45rem]`}
    >
      <div className="flex flex-row items-center justify-between text-xl">
        <div
          className={`absolute left-0 h-[64px] w-2 ${color} round-bl-lg rounded-bl-lg rounded-tl-lg`}
        ></div>
        <div className="flex flex-row items-center gap-2 text-xl">
          <h2 className="font-bold">#{order.pickUpId}</h2>
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
        <OrderItems items={order.items} />

        <hr />

        <div className="flex flex-col justify-between md:flex-row">
          <OrderPrice items={order.items} />
          <div className="flex flex-col items-center gap-2 md:flex-row">
            {status === "sent" && (
              <Button key="cancel-button" onClick={handleCancel}>
                Zrušit
              </Button>
            )}

            <AnimatePresence>
              <AnimationWrapper
                keyValue="status-button"
                className="flex flex-row items-center gap-2"
              >
                <span>{statusText}</span>
              </AnimationWrapper>
            </AnimatePresence>
          </div>
        </div>
      </motion.ul>
    </motion.div>
  );
};

export default Order;
