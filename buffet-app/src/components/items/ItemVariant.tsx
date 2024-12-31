import { Variant } from "../../types";
import { formatCurrency } from "../utils/utils";

type ItemVariantProps = {
  name: Variant["name"];
  price: Variant["price"];
};

const ItemVariant = ({ name, price }: ItemVariantProps) => {
  return (
    <label className="flex items-center gap-2">
      <input type="checkbox" />
      <div className="flex w-full items-center justify-between">
        <p>{name}</p>
        <p className="line-clamp-3 overflow-hidden rounded-lg px-2 text-descriptionColor">
          +{formatCurrency(price)}
        </p>
      </div>
    </label>
  );
};

export default ItemVariant;
