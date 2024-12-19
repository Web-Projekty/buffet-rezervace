import { MenuItem } from "../../types";
import { formatCurrency } from "../utils/utils";

type MenuItemVariantsProps = {
  menuItemId: MenuItem["id"];
  variants: MenuItem["variants"];
};

export const dummyVariants = [
  {
    name: "Kečup",
    price: 5,
  },
  {
    name: "Hořčice",
    price: 5,
  },
];

const MenuItemVariants = ({ variants }: MenuItemVariantsProps) => {
  return (
    <div className="flex flex-col gap-1">
      {variants &&
        variants.map((item) => {
          return (
            <label className="flex items-center gap-2" key={item.name}>
              <input type="checkbox" />
              <div className="flex w-full items-center justify-between">
                <p>{item.name}</p>
                <p className="text-descriptionColor">
                  +{formatCurrency(item.price)}
                </p>
              </div>
            </label>
          );
        })}
    </div>
  );
};

export default MenuItemVariants;
