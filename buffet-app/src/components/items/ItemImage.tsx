import { useEffect, useState } from "react";
import { Allergen } from "../../types";
import ItemAllergens from "./ItemAllergens";
import { motion } from "framer-motion";

type ItemImageProps = {
  image: string;
  name: string;
  allergens: Allergen[];
};

const ItemImage = ({ image, name, allergens }: ItemImageProps) => {
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
        <div className="skeleton h-[12rem] w-[16rem] animate-pulse rounded-lg bg-slate-700"></div>
      )}
      <motion.img
        src={imageSrc}
        alt={name}
        className={`h-[12rem] w-[16rem] rounded-lg object-cover ${loading ? "hidden" : "block"}`}
        onLoad={handleImageLoad}
        onError={handleImageError}
        initial={{ opacity: 0 }}
        animate={{ opacity: loading ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      />

      <ItemAllergens allergens={allergens} />
    </div>
  );
};

export default ItemImage;
