import { OrderStatus } from "../../types/types";
import Button from "../ui/Button";
import { useUser } from "../../hooks/useUser";
import { HandleStatusReturn } from "../../hooks/useOrder";

type OrderButtonProps = {
  buttonText: string;
  handleStatus?: (
    status: OrderStatus,
    token: string | null,
  ) => Promise<HandleStatusReturn>;
  status?: OrderStatus;
  loading: boolean;
  payURL?: string;
};

const OrderButton = ({
  handleStatus,
  status,
  loading,
  payURL,
  buttonText,
}: OrderButtonProps) => {
  const { token } = useUser();

  const handleCancel = async () => {
    try {
      if (handleStatus) {
        await handleStatus("storno", token);
      }
    } catch {
      //console.error("Failed to cancel the order:", error);
    }
  };

  const isDisabled = ["storno", "cancelled", "done"].includes(
    status ? status : "",
  );

  return (
    <Button
      className={`flex w-full flex-row items-center justify-center gap-1 ${
        isDisabled
          ? "gray-400 border-gray-500 bg-gray-500 hover:border-gray-500 hover:bg-gray-500"
          : payURL
            ? "border-green-400 bg-green-400 hover:border-green-500 hover:bg-green-500"
            : "border-red-400 bg-red-400 hover:border-red-500 hover:bg-red-500"
      }`}
      onClick={() =>
        payURL ? (window.location.href = payURL) : handleCancel()
      }
      disabled={isDisabled || loading}
      loading={loading}
    >
      {buttonText}
      {/*showIcon && <X />*/}
    </Button>
  );
};

export default OrderButton;
