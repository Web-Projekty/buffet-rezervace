import { motion } from "framer-motion";
import { MutableRefObject } from "react";
import { menuItemShowAnimation } from "../../animations";
import { Category, MenuItem } from "../../types";
import MenuItems from "./MenuItems";

type MenuSectionsProps = {
  categories: Category[];
  menuItems: MenuItem[] | null;
  refs: MutableRefObject<{ [key: number]: HTMLElement | null }>;
};

const MenuSections = ({ categories, menuItems, refs }: MenuSectionsProps) => {
  return (
    <motion.section
      {...menuItemShowAnimation(0.5)}
      className="flex flex-col items-start"
    >
      {categories.map((category) => (
        <section
          className="mt-5 flex flex-col gap-3"
          key={category.id}
          ref={(el) => (refs.current[category.id] = el)}
        >
          <div className="flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-0">
            <h1 className="text-4xl font-bold text-white">{category.name}</h1>
            <p className="text-white md:mr-5">{category.description}</p>
          </div>

          <MenuItems
            menuItems={menuItems}
            categories={categories}
            categoryId={category.id}
          />
        </section>
      ))}
    </motion.section>
  );
};

export default MenuSections;
