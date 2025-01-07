import { X } from "lucide-react";
import { OrderStatus } from "../../types";
import Button from "../ui/Button";
import { updateOrder } from "../utils/api";
import { useUser } from "../../hooks/useUser";

type OrderButtonsProps = {
  status: OrderStatus;
  orderId: number | null;
};

type OrderButton = {
  name: string;
  icon: JSX.Element;
  onClick: (
    token: string | null,
    orderId: number | null,
    status: OrderStatus,
  ) => void;
  disabledStatus: OrderStatus[];
};

const Buttons: OrderButton[] = [
  {
    name: "Zrušit",
    icon: <X />,
    onClick: (
      token: string | null,
      orderId: number | null,
      status: OrderStatus,
    ) => {
      updateOrder(token, orderId, status);
    },
    disabledStatus: ["storno", "cancelled"],
  },
];

const OrderButtons = ({ orderId, status }: OrderButtonsProps) => {
  const { token } = useUser();
  return (
    <div>
      {Buttons.map(({ name, icon, onClick, disabledStatus }) => {
        if (disabledStatus.includes(status)) {
          return (
            <p className="text-left">
              Objednávka byla zrušena vámi či provozovatelem.
            </p>
          );
        }

        return (
          <Button
            key={name}
            className="flex w-full flex-row justify-center gap-2 border-red-400 bg-red-400 hover:border-red-500 hover:bg-red-500"
            onClick={() => onClick(token, orderId, disabledStatus[0])}
          >
            {name}
            {icon}
          </Button>
        );
      })}
    </div>
  );
};

export default OrderButtons;
