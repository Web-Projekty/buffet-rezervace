import { formatCurrency } from "../../utils";

type MenuItemTextProps = {
  name: string;
  price: number;
  description: string;
};

const MenuItemText = ({ name, price, description }: MenuItemTextProps) => {
  return (
    <div className="flex flex-col justify-center gap-1">
      <div className="flex items-center justify-between font-bold">
        <h1 className="w-full rounded-lg px-1 text-xl">{name}</h1>
        <span className="rounded-lg text-lg font-normal italic">
          {formatCurrency(price)}
        </span>
      </div>
      <hr />
      <p className="text-descriptionColor rounded-lg px-2">{description}</p>
    </div>
  );
};

export default MenuItemText;
