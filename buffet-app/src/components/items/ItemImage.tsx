import { Allergen } from "../../types";
import LazyImage from "../ui/LazyImage";
import ItemAllergens from "./ItemAllergens";

type ItemImageProps = {
  image: string;
  name: string;
  allergens: Allergen[];
};

const ItemImage = ({ image, name, allergens }: ItemImageProps) => {
  return (
    <div className="relative">
      <LazyImage image={image} alt={name} />
      <ItemAllergens allergens={allergens} />
    </div>
  );
};

export default ItemImage;
