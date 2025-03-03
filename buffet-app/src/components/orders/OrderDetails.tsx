import { HandleStatusReturn } from "../../hooks/useOrder";
import { MappedOrderItem, OrderStatus } from "../../types";
import OrderButton from "./OrderButton";
import OrderItems from "./OrderItems";

type OrderDetailsProps = {
  dateCreated: string;
  mappedItems: MappedOrderItem[];
  status: OrderStatus;
  handleStatus: (
    status: OrderStatus,
    token: string | null,
  ) => Promise<HandleStatusReturn>;
  loading: boolean;
  paid: boolean;
  payURL: string;
};

const OrderDetails = ({
  dateCreated,
  mappedItems,
  status,
  handleStatus,
  loading,
  paid,
  payURL,
}: OrderDetailsProps) => {
  return (
    <div
      className={`mt-5 grid grid-cols-1 justify-center gap-5 overflow-hidden px-4 md:grid-cols-2 md:justify-between md:gap-0`}
    >
      <div className="flex w-full max-w-[300px] flex-col gap-2">
        <p className="font-semibold">Objednané položky:</p>
        <OrderItems mappedItems={mappedItems} />
      </div>

      <div className="flex flex-col justify-between gap-2">
        <div className="flex flex-col">
          <p>
            <span className="font-semibold">Vytvořeno:</span> {dateCreated}
          </p>

          <p>
            <span className="font-semibold">Zaplaceno:</span>{" "}
            {paid ? "Ano" : "Ne"}
          </p>
        </div>
        <div className="flex flex-col items-center gap-2 md:flex-row">
          {status !== "done" &&
            status !== "storno" &&
            status !== "cancelled" &&
            !paid && (
              <>
                <OrderButton
                  loading={loading}
                  payURL={payURL}
                  buttonText="Zaplatit (online)"
                />
                <OrderButton
                  status={status}
                  handleStatus={handleStatus}
                  loading={loading}
                  buttonText="Zrušit"
                />
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
