import { formatCurrency } from "../../utils";

type MenuItemTextProps = {
  name: string;
  price: number;
  description: string;
};

const MenuItemText = ({ name, price, description }: MenuItemTextProps) => {
  return (
    <>
      <div className="flex items-center justify-between font-FiraSans font-bold">
        <h1 className="w-[7rem] rounded-lg px-1 text-xl">{name}</h1>
        {/* <div className="mt-4 flex-1 border-b-2 border-dotted border-white px-2"></div> */}
        <p className="rounded-lg px-2 text-lg font-normal italic">
          {formatCurrency(price)}
        </p>
      </div>

      <p className="rounded-lg px-2">{description}</p>
    </>
  );
};

export default MenuItemText;
