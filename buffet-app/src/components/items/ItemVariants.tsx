import { MenuItem } from "../../types";
import ItemVariant from "./ItemVariant";

type ItemVariantsProps = {
  id: MenuItem["id"];
  variants: MenuItem["variants"];
};

const ItemVariants = ({ id, variants }: ItemVariantsProps) => {
  return (
    <div className="flex flex-col gap-1">
      {variants &&
        variants.map((item) => {
          return <ItemVariant key={item.name} {...item} />;
        })}
    </div>
  );
};

export default ItemVariants;
