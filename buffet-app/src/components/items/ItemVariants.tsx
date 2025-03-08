import { MenuItem } from "../../types";

type ItemVariantsProps = {
  id?: MenuItem["id"];
  variants: MenuItem["variants"];
};

// removed variants to fix frontend build, this will probably cause conflicts 
const ItemVariants = ({}: ItemVariantsProps) => {
  return (
    <div className="flex flex-col gap-1">
      {/* {variants &&
        variants.map((item) => {
          return item;
        })} */}
    </div>
  );
};

export default ItemVariants;
