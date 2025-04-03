import { PaymentMethod } from "../../../types/types";

type CartPurchaseMethodsProps = {
  method: PaymentMethod;
  selectedPaymentMethods: PaymentMethod[];
  handlePaymentMethodChange: (method: PaymentMethod) => void;
};

const CartPurchaseMethod = ({
  selectedPaymentMethods,
  handlePaymentMethodChange,
  method,
}: CartPurchaseMethodsProps) => {
  const { name, image, enabled, input } = method;

  const handlePaymentMethod = (method: PaymentMethod): void => {
    if (!enabled) return;
    handlePaymentMethodChange(method);
  };

  return (
    <div
      key={name}
      className={`flex flex-row items-center justify-between rounded-lg border border-white p-2 ${!enabled ? "opacity-50" : ""}`}
      onClick={() => handlePaymentMethod(method)}
    >
      <div className="flex flex-row items-center justify-center gap-2">
        {image.map((image) => (
          <img
            key={image.alt}
            src={image.src}
            alt={image.alt}
            className={
              image.width && image.height
                ? `w-${image.width} h-${image.height}`
                : "h-10 w-10"
            }
          />
        ))}
      </div>

      <label htmlFor={name} className="mx-1 ml-auto text-sm">
        {name}
      </label>
      <input
        type={input}
        name={input === "radio" ? "payment" : undefined}
        id={name}
        checked={selectedPaymentMethods.includes(method)}
        onChange={() => handlePaymentMethod(method)}
        className="pointer-events-none"
        disabled={!enabled}
      />
    </div>
  );
};

export default CartPurchaseMethod;
