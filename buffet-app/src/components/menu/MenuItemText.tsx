import { formatCurrency } from "../../utils";

type MenuItemTextProps = {
  name: string;
  price: number;
  description: string;
};

const MenuItemText = ({ name, price, description }: MenuItemTextProps) => {
  return (
    <>
      <div className="flex items-center font-bold">
        <h1 className="rounded-lg px-2 text-xl">{name}</h1>
        <div className="mt-4 flex-1 border-b-2 border-dotted border-white"></div>
        <p className="font-FiraSans rounded-lg px-2 text-lg font-normal italic">
          {formatCurrency(price)}
        </p>
      </div>

      <div className="font-FiraSans flex flex-col items-start px-2">
        <p className="rounded-lg">{description}</p>
      </div>
    </>
  );
};

export default MenuItemText;
