import useCart, { CartItem } from "../../store/CartStore";
import { formatCurrency } from "../utils/utils";

type ItemPrice = {
  id: CartItem["id"];
  price: CartItem["price"];
  variants: CartItem["variants"];
};

const ItemPrice = ({ id, price, variants }: ItemPrice) => {
  const { getItemQuantity } = useCart();

  /*const variantsPrice = variants
    ? variants.reduce((acc, variant) => acc + variant, 0)
    : 0;*/
  const finalPrice = getItemQuantity(id) * price /* + variantsPrice*/;

  return (
    <div className="flex items-center justify-between text-lg">
      <div className="flex flex-row gap-3">
        <p>Celkem</p>
        <span>x {getItemQuantity(id)}</span>
      </div>
      <p className="font-bold">{formatCurrency(finalPrice)}</p>
    </div>
  );
};

export default ItemPrice;
