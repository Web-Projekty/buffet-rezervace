import { AnimatePresence, motion } from "framer-motion";
import { formatCurrency, formatUnixDate } from "../../utils";
import { useState } from "react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { LuBadgeCheck, LuBadgeX, LuBadgeInfo } from "react-icons/lu";
import { MenuItem, Order as OrderType } from "../../types";
import { scaleUpAnimation } from "../../animations";

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

const CancelButton = ({ handleCancel }: { handleCancel: () => void }) => {
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

const PickupButton = ({ handlePickup }: { handlePickup: () => void }) => {
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

const AnimationWrapper = ({
  children,
  keyValue,
}: {
  children: React.ReactNode;
  keyValue: string;
}) => {
  return (
    <motion.div key={keyValue} {...scaleUpAnimation()}>
      {children}
    </motion.div>
  );
};

const Order = ({ order, isAdmin }: { order: OrderType; isAdmin?: boolean }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<OrderType["status"]>(order.status);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleCancel = () => {
    setStatus("notpickedup");
  };

  const handlePickup = () => {
    setStatus("pickedup");
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`flex w-auto flex-col rounded-lg bg-slate-900 p-4 md:w-[45rem]`}
    >
      <div className="flex flex-row items-center justify-between text-xl">
        <div className="flex flex-row items-center gap-2 text-xl">
          <h2>#{order.id}</h2>
          <p>{formatUnixDate(order.date)}</p>
          {isAdmin && order.user && (
            <p className="text-base">
              {order.user?.fullName}, {order.user?.class}, {order.user?.email}
            </p>
          )}
        </div>

        <div className="flex flex-row items-center">
          <AnimatePresence>
            {!isOpen && (
              <AnimationWrapper keyValue="pickedup">
                <StatusBadge status={status} />
              </AnimationWrapper>
            )}
          </AnimatePresence>
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
          {order.items.map((item: MenuItem) => (
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
                  (acc: number, item: MenuItem) => acc + item.price,
                  0,
                ),
              )}
            </p>
          </div>
          <div className="flex flex-row items-center gap-2">
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
                  <span>
                    {status === "pending"
                      ? "Čeká na vyzvednutí"
                      : status === "pickedup"
                        ? "Vyzvednuto"
                        : "Nevyzvednuto"}
                  </span>
                  <StatusBadge status={status} />
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
