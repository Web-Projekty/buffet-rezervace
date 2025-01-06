import { Category } from "../../types";
import LazyImage from "../ui/LazyImage";

type MenuCategoryProps = {
  category: Category;
  onClick: (filterValue: string) => void;
};

const MenuCategory = ({ category, onClick }: MenuCategoryProps) => {
  return (
    <div
      className={`group relative aspect-[15/3] cursor-pointer overflow-hidden rounded-lg`}
      onClick={() => onClick(category.name === "Vše" ? "" : category.name)}
    >
      <LazyImage image={category.image} alt={category.name + "'s image"} />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <h2 className="text-xl font-bold text-white">{category.name}</h2>
      </div>
    </div>
  );
};

export default MenuCategory;
