import { LuBadgePlus } from "react-icons/lu";
import { formatCurrency } from "../utils";

type ItemType = {
  image: string;
  name: string;
  price: number;
  description: string;
};

const Item = ({ image, name, price, description }: ItemType) => {
  return (
    <div className="relative flex w-[19rem] flex-col justify-around gap-5 rounded-lg border-b-2 bg-white p-4 shadow-sm shadow-gray-500">
      <img
        src={image}
        alt={name}
        className="h-[15rem] w-[20rem] rounded-lg object-cover"
      />
      <div className="flex flex-col gap-3 rounded-lg bg-white p-2">
        <div className="flex items-center">
          <h2 className="rounded-lg bg-white px-2 text-xl font-bold">{name}</h2>
          <div className="mt-4 flex-1 border-b-2 border-dotted border-black"></div>
          <p className="rounded-lg bg-white px-2 text-lg">
            {formatCurrency(price)}
          </p>
        </div>
        <p className="w-[240px] rounded-lg bg-white px-2">{description}</p>
        <div className="flex items-center justify-center">
          <LuBadgePlus
            size={48}
            className="bg-white p-2 hover:cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default Item;
