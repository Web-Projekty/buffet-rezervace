import { X } from "lucide-react";
import { OrderStatus } from "../../types";
import Button from "../ui/Button";
import { useUser } from "../../hooks/useUser";
import { UseStatusOrderReturn } from "../../hooks/useOrder";

type OrderButtonsProps = {
  status: OrderStatus;
  orderId: number | null;
  handleStatus: UseStatusOrderReturn["handleStatus"];
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

const OrderButtons = ({ status, handleStatus }: OrderButtonsProps) => {
  const { token } = useUser();
  const cancelOrder = () => {
    handleStatus("storno", token);
  };
  return (
    <div>
      {Buttons.map(({ name, icon, disabledStatus }) => {
        if (disabledStatus.includes(status)) {
          return (
            <p className="text-left" key={name}>
              Objednávka byla zrušena vámi či provozovatelem.
            </p>
          );
        }

        return (
          <Button
            key={name}
            className="flex w-full flex-row justify-center gap-2 border-red-400 bg-red-400 hover:border-red-500 hover:bg-red-500"
            onClick={cancelOrder}
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
