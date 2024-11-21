import { useEffect, useState } from "react";
import { Allergen } from "../../types";

type MenuItemImageProps = {
  image: string;
  name: string;
  allergens: Allergen[];
};

const MenuItemImage = ({ image, name, allergens }: MenuItemImageProps) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, [image]);

  return (
    <div className="relative">
      {loading && (
        <div className="skeleton h-[12rem] w-[16rem] animate-pulse rounded-lg bg-slate-700"></div>
      )}
      <img
        src={image}
        alt={name}
        className={`h-[12rem] w-[16rem] rounded-lg object-cover ${loading ? "hidden" : "block"}`}
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
