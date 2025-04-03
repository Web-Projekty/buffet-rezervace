import { Pen } from "lucide-react";
import { Category } from "../../../types/types";

type MenuEditCategoryProps = {
  category: Category;
  isCategoryBarOpen: boolean;
  handleCategoryBarOpen: (id?: number) => void;
};

const MenuEditCategory = ({
  category,
  isCategoryBarOpen,
  handleCategoryBarOpen,
}: MenuEditCategoryProps) => {
  return (
    <div className="flex flex-col items-center justify-between md:flex-row">
      <h1 className="text-4xl font-bold text-white">{category.name}</h1>
      <div className="flex gap-2">
        <div className="mr-5 text-white">{category.description}</div>

        <Pen
          className={`text-white ${isCategoryBarOpen ? "cursor-not-allowed opacity-75" : "cursor-pointer"}`}
          onClick={() =>
            !isCategoryBarOpen ? handleCategoryBarOpen(category.id) : undefined
          }
        />
      </div>
    </div>
  );
};

export default MenuEditCategory;
