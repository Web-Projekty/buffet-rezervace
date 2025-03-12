import { CartItem, CartItems } from "../../store/CartStore";
import { Variant } from "../../types";
import { formatCurrency } from "../utils/utils";

type ItemVariantProps = {
  id: CartItem["id"];
  variant: Variant;
  selectedVariants: CartItem["selectedVariants"];
  updateVariants: CartItems["updateVariants"];
};

const ItemVariant = ({
  id,
  variant,
  selectedVariants,
  updateVariants,
}: ItemVariantProps) => {
  const { name, addedPrice, isExclusive } = variant;

  const handleVariantChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      updateVariants(id, [...selectedVariants, variant.id]);
    } else {
      updateVariants(
        id,
        selectedVariants.filter((v) => v !== variant.id),
      );
    }
  };

  return (
    <label className="flex items-center gap-2">
      {isExclusive ? (
        <input
          type="radio"
          name={"variant" + id}
          checked={selectedVariants.includes(variant.id)}
          onChange={handleVariantChange}
        />
      ) : (
        <input
          type="checkbox"
          checked={selectedVariants.includes(variant.id)}
          onChange={handleVariantChange}
        />
      )}

      <div className="flex w-full items-center justify-between">
        <p>{name}</p>
        <p className="line-clamp-3 overflow-hidden rounded-lg px-2 text-descriptionColor">
          +{formatCurrency(addedPrice)}
        </p>
      </div>
    </label>
  );
};

export default ItemVariant;
