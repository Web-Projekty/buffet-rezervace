import { MenuItem } from "../../types";

type MenuItemVariantsProps = {
  variants: MenuItem["variants"];
};

const MenuItemVariants = ({ variants }: MenuItemVariantsProps) => {
  return (
    <div>
      {variants &&
        variants.map((item) => {
          return (
            <div key={item.name} className="flex justify-between gap-2">
              <p>{item.name}</p>
              <p>{item.price} Kč</p>
            </div>
          );
        })}
    </div>
  );
};

export default MenuItemVariants;
