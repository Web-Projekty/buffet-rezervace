import { CartItem, CartItems } from "../../store/CartStore";
import { Variant } from "../../types";
import ItemVariant from "./ItemVariant";

type ItemVariantsProps = {
  id: CartItem["id"];
  variants: CartItem["variants"];
  selectedVariants: CartItem["selectedVariants"];
  updateVariants: CartItems["updateVariants"];
  quantity: CartItem["quantity"];
};

const ItemVariants = ({
  variants,
  selectedVariants,
  updateVariants,
  id,
  quantity,
}: ItemVariantsProps) => {
  const variantsArray: Variant[] = Array.isArray(variants)
    ? variants
    : variants
      ? Object.values(variants)
      : [];

  return (
    <div className="flex flex-col gap-1">
      {variantsArray.map((item) => {
        return (
          <ItemVariant
            key={item.id}
            variant={item}
            selectedVariants={selectedVariants}
            updateVariants={updateVariants}
            id={id}
            quantity={quantity}
          />
        );
      })}
    </div>
  );
};

export default ItemVariants;
