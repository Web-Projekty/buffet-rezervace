import { paymentMethods } from "../../../constants/constants";
import { PaymentMethod } from "../../../types/types";
import CartPurchaseMethod from "./CartPurchaseMethod";

type CartPurchaseMethodsProps = {
  selectedPaymentMethods: PaymentMethod[];
  setSelectedPaymentMethods: React.Dispatch<
    React.SetStateAction<PaymentMethod[]>
  >;
};

const CartPurchaseMethods = ({
  selectedPaymentMethods,
  setSelectedPaymentMethods,
}: CartPurchaseMethodsProps) => {
  const handlePaymentMethodChange = (method: PaymentMethod): void => {
    setSelectedPaymentMethods((prev) => {
      if (method.input === "radio") {
        const filtered = prev.filter((m) => m.input !== "radio");
        return [...filtered, method];
      }
      if (prev.includes(method)) {
        return prev.filter((m) => m !== method);
      }
      return [...prev, method];
    });
  };
  return (
    <div className="flex flex-col gap-2 rounded-lg bg-backgroundColor p-3">
      {paymentMethods.map((method) => {
        return (
          <CartPurchaseMethod
            key={method.name}
            method={method}
            handlePaymentMethodChange={handlePaymentMethodChange}
            selectedPaymentMethods={selectedPaymentMethods}
          />
        );
      })}
    </div>
  );
};

export default CartPurchaseMethods;
