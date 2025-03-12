import useCart, { CartItem } from "../../store/CartStore";
import { Variant } from "../../types";
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

  const variantsArray: Variant[] = Array.isArray(variants)
    ? variants // Already an array
    : variants
      ? Object.values(variants) // Convert object to array
      : []; // Default empty array if variants is null/undefined

  const variantsPrice = selectedVariants.reduce((acc, variantId) => {
    const variant = variantsArray.find((v) => v.id === variantId);
    return acc + (variant ? variant.addedPrice : 0);
  }, 0);
  const finalPrice =
    getItemQuantity(id) * price + variantsPrice * getItemQuantity(id);

  return (
    <div className="flex items-center justify-between text-lg">
      <p>Celkem</p>
      <p className="font-bol italic">{formatCurrency(finalPrice)}</p>
    </div>
  );
};

export default ItemPrice;
