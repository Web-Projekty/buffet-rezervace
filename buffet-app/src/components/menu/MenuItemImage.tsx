import { Allergen } from "../../types";

type MenuItemImageProps = {
  image: string;
  name: string;
  allergens: Allergen[];
};

const MenuItemImage = ({ image, name, allergens }: MenuItemImageProps) => {
  return (
    <div className="relative">
      <img
        src={image}
        alt={name}
        className="h-[15rem] w-[20rem] rounded-lg object-cover"
      />
      <ul className="absolute bottom-0 m-1 flex flex-row gap-1">
        {allergens.map((allergen) => (
          <li key={allergen.id} className="rounded-full bg-slate-600 p-1 px-3">
            {allergen.id}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuItemImage;
