import { MenuItem } from "../../types";

type ItemVariantsProps = {
  id?: MenuItem["id"];
  variants: MenuItem["variants"];
};

const ItemVariants = ({ variants }: ItemVariantsProps) => {
  return (
    <div className="flex flex-col gap-1">
      {variants &&
        variants.map((item) => {
          return item;
        })}
    </div>
  );
};

export default ItemVariants;
