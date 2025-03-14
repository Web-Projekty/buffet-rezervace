import ItemButtons from "../items/ItemButtons";
import ItemImage from "../items/ItemImage";
import ItemVariants from "../items/ItemVariants";
import ItemPrice from "../items/ItemPrice";
import { CartItem as CartItemType, CartItems } from "../../store/CartStore";

type CartItemProps = {
  item: CartItemType;
  updateVariants: CartItems["updateVariants"];
};

const CartItem = ({ item, updateVariants }: CartItemProps) => {
  return (
    <div
      key={item.id}
      className="grid w-[20rem] grid-cols-1 gap-5 rounded-lg bg-slate-700 p-4 text-white shadow-sm shadow-black md:w-[32rem] md:grid-cols-2"
    >
      <div className="flex h-full flex-col justify-between gap-5">
        <div className="flex flex-col items-start">
          <h1 className="text-lg font-bold">{item.name}</h1>
          <p className="text-base text-descriptionColor">{item.description}</p>
        </div>

        <div className="flex flex-col gap-2">
          <ItemVariants {...item} updateVariants={updateVariants} />
          <hr />
          <ItemPrice {...item} />
          <div className="flex flex-row items-center justify-center">
            <ItemButtons item={item} />
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:h-full md:flex-col md:items-center md:justify-center">
        <ItemImage {...item} />
      </div>
    </div>
  );
};

export default CartItem;
