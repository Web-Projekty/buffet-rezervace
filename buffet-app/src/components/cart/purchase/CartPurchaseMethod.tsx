import { PaymentMethod } from "../../../types";

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
  const { name, image } = method;
  return (
    <div
      key={name}
      className="flex flex-row items-center justify-between rounded-lg border border-white p-2"
      onClick={() => handlePaymentMethodChange(method)}
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

      <label htmlFor={method.name} className="mx-1 ml-auto text-sm">
        {method.name}
      </label>
      <input
        type={method.input}
        name={method.input === "radio" ? "payment" : undefined}
        id={method.name}
        checked={selectedPaymentMethods.includes(method)}
        onChange={() => handlePaymentMethodChange(method)}
        className="pointer-events-none"
      />
    </div>
  );
};

export default CartPurchaseMethod;
