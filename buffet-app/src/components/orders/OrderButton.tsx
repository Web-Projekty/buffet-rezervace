import { X } from "lucide-react";
import { OrderStatus } from "../../types";
import Button from "../ui/Button";
import { useUser } from "../../hooks/useUser";
import { ReactNode, useState } from "react";
import { HandleStatusReturn } from "../../hooks/useOrder";

type OrderButtonsProps = {
  handleStatus: (
    status: OrderStatus,
    token: string | null,
  ) => Promise<HandleStatusReturn>;
  status: OrderStatus;
  loading: boolean;
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
    disabledStatus: ["storno", "cancelled", "done"],
  },
];

const OrderButton = ({ handleStatus, status, loading }: OrderButtonsProps) => {
  const { token } = useUser();
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

        if (status === "done") {
          return null;
        }

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
