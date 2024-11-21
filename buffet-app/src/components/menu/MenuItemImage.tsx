import { useEffect, useState } from "react";
import { Allergen } from "../../types";

type MenuItemImageProps = {
  image: string;
  name: string;
  allergens: Allergen[];
};

const MenuItemImage = ({ image, name, allergens }: MenuItemImageProps) => {
  const [loading, setLoading] = useState(true);
  const [imageSrc, setImageSrc] = useState<string>(image);

  useEffect(() => {
    setLoading(true);
    setImageSrc(`${image}?${new Date().getTime()}`);
  }, [image]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const handleImageError = () => {
    setLoading(false);
  };

  return (
    <div className="relative">
      {loading && (
        <div className="skeleton h-[12rem] w-[14rem] animate-pulse rounded-lg bg-slate-700"></div>
      )}
      <img
        src={imageSrc}
        alt={name}
        className={`h-[12rem] w-[16rem] rounded-lg object-cover ${loading ? "hidden" : "block"}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
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
