import { formatCurrency } from "../utils/utils";

type MenuItemTextProps = {
  name: string;
  price: number;
  description: string;
};

const MenuItemText = ({ name, price, description }: MenuItemTextProps) => {
  return (
    <div className="flex flex-col justify-center gap-1">
      <div className="flex h-[4rem] items-center justify-between font-bold">
        <h1 className="w-full rounded-lg text-xl">{name}</h1>
        <span className="rounded-lg text-lg font-normal italic">
          {formatCurrency(price)}
        </span>
      </div>
      <hr />
      <p className="rounded-lg px-2 text-descriptionColor">{description}</p>
    </div>
  );
};

export default MenuItemText;
