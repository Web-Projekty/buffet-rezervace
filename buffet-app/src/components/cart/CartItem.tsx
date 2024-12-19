import useCart from "../../store/CartStore";
import { MenuItem } from "../../types";
import MenuItemButtons from "../menu/MenuItemButtons";
import MenuItemImage from "../menu/MenuItemImage";
import MenuItemVariants from "../menu/MenuItemVariants";
import { formatCurrency } from "../utils/utils";

type CartItemProps = {
  item: MenuItem;
};

const CartItem = ({ item }: CartItemProps) => {
  const { getItemQuantity } = useCart();

  const variantsPrice = item.variants
    ? item.variants.reduce((acc, variant) => acc + variant.price, 0)
    : 0;

  return (
    <div
      key={item.id}
      className="grid w-[22rem] grid-cols-1 gap-5 rounded-lg bg-slate-700 p-4 text-white shadow-sm shadow-black md:w-[32rem] md:grid-cols-2"
    >
      <div className="flex h-full flex-col justify-between gap-5">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">{item.name}</h1>
          <p className="text-base text-descriptionColor">{item.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <MenuItemVariants menuItemId={item.id} variants={item.variants} />
          <hr />
          <div className="flex items-center justify-between text-lg">
            <div className="flex flex-row gap-3">
              <p>Celkem</p>
              <span>x {getItemQuantity(item.id)}</span>
            </div>
            <p className="font-bold">
              {formatCurrency(
                getItemQuantity(item.id) * (item.price + variantsPrice),
              )}
            </p>
          </div>
          <div className="flex flex-row items-center justify-center">
            <MenuItemButtons item={item} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:h-full md:flex-col md:items-center md:justify-center">
        <MenuItemImage {...item} />
      </div>
    </div>
  );
};

export default CartItem;
