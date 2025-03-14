import { Category } from "../../types";
import LazyImage from "../ui/LazyImage";

type MenuCategoryProps = {
  category: Category;
  onClick: (categoryId: number) => void;
};

const MenuCategory = ({ category, onClick }: MenuCategoryProps) => {
  const handleClick = () => {
    onClick(category.id);
  };
  return (
    <article
      className={`group relative aspect-[18/10] cursor-pointer overflow-hidden rounded-lg transition-all duration-1000 ease-in-out md:aspect-[15/3]`}
      onClick={handleClick}
    >
      <LazyImage image={category.image} alt={category.name + "'s image"} />
      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
        <h2 className="text-base font-semibold text-white md:text-xl">
          {category.name}
        </h2>
      </div>
    </article>
  );
};

export default MenuCategory;
