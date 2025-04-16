import { PaymentMethod } from "../../../types/types";

type CartPurchaseSelectedMethodsProps = {
  selectedPaymentMethods: PaymentMethod[];
};

const CartPurchaseSelectedMethods = ({
  selectedPaymentMethods,
}: CartPurchaseSelectedMethodsProps) => {
  const sortedSelectedPaymentMethods = () =>
    selectedPaymentMethods.sort((a, b) => {
      if (a.name === "Předplacené kredity") return -1;
      if (b.name === "Předplacené kredity") return 1;
      return 0;
    });

  return (
    <div className="flex flex-col items-end rounded-lg">
      {sortedSelectedPaymentMethods().length > 0 ? (
        sortedSelectedPaymentMethods().map((method) => (
          <p key={method.name}>{method.name}</p>
        ))
      ) : (
        <p>Nebyla vybrána žádná metoda</p>
      )}
    </div>
  );
};

export default CartPurchaseSelectedMethods;
