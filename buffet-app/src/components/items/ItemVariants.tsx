import { CartItem, CartItems } from "../../store/CartStore";
import { MenuItem } from "../../types";
import ItemVariant from "./ItemVariant";

type ItemVariantsProps = {
  id: CartItem["id"];
  variants: MenuItem["variants"];
  selectedVariants: CartItem["selectedVariants"];
  updateVariants: CartItems["updateVariants"];
};

const ItemVariants = ({
  variants,
  selectedVariants,
  updateVariants,
  id,
}: ItemVariantsProps) => {
  return (
    <div className="flex flex-col gap-1">
      {variants &&
        variants.map((item) => {
          return (
            <ItemVariant
              key={item.id}
              variant={item}
              selectedVariants={selectedVariants}
              updateVariants={updateVariants}
              id={id}
            />
          );
        })}
    </div>
  );
};

export default ItemVariants;
