import useCart, { CartItem } from "../../store/CartStore";
import { formatCurrency } from "../utils/utils";

type ItemPriceProps = {
  id: CartItem["id"];
  price: CartItem["price"];
  variants: CartItem["variants"];
  selectedVariants: CartItem["selectedVariants"];
};

const ItemPrice = ({
  id,
  price,
  variants,
  selectedVariants,
}: ItemPriceProps) => {
  const { getItemQuantity } = useCart();

  const variantsPrice = selectedVariants.reduce((acc, variantId) => {
    const variant = variants.find((v) => v.id === variantId);
    return acc + (variant ? variant.addedPrice : 0);
  }, 0);
  const finalPrice =
    getItemQuantity(id) * price + variantsPrice * getItemQuantity(id);

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
