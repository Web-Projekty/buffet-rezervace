import { X } from "lucide-react";
import { Order, OrderStatus } from "../../types";
import Button from "../ui/Button";
import { useUser } from "../../hooks/useUser";
import { ReactNode, useState } from "react";
import { useOrder } from "../../hooks/useOrder";

type OrderButtonsProps = {
  order: Order;
};

type OrderButton = {
  name: string;
  icon: JSX.Element;
  disabledStatus: OrderStatus[];
};

const Buttons: OrderButton[] = [
  {
    name: "Zrušit",
    icon: <X />,
    disabledStatus: ["storno", "cancelled"],
  },
];

const OrderButton = ({ order }: OrderButtonsProps) => {
  const { token } = useUser();
  const { handleStatus, status, loading } = useOrder(order);
  const [error, setError] = useState<string>("");

  const cancelOrder = async () => {
    try {
      const { error } = await handleStatus("storno", token);
      if (error) {
        setError("Chyba při zrušení objednávky.");
      }
    } catch {
      setError("Chyba při zrušení objednávky.");
    }
  };

  const renderButtonContent = (
    name: string,
    isCanceled: boolean,
  ): ReactNode => {
    if (isCanceled) {
      return "Zrušeno";
    }

    if (error) {
      return error;
    }

    return name;
  };

  const renderIcon = (icon: JSX.Element, isDisabled: boolean): ReactNode => {
    if (isDisabled) {
      return null;
    }

    if (loading) {
      return null;
    }

    if (error) {
      return null;
    }

    return icon;
  };

  return (
    <div>
      {Buttons.map(({ name, icon, disabledStatus }) => {
        const isDisabled = disabledStatus.includes(status);

        return (
          <Button
            key={name}
            className={`flex w-full flex-row items-center justify-center gap-1 ${isDisabled ? "gray-400 border-gray-500 bg-gray-500 hover:border-gray-500 hover:bg-gray-500" : "border-red-400 bg-red-400 hover:border-red-500 hover:bg-red-500"}`}
            onClick={cancelOrder}
            disabled={isDisabled || loading}
            loading={loading}
          >
            {renderButtonContent(name, isDisabled)}
            {renderIcon(icon, isDisabled)}
          </Button>
        );
      })}
    </div>
  );
};

export default OrderButton;
