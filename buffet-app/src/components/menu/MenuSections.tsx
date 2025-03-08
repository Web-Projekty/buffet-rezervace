import { Category, MenuItem } from "../../types";
import { motion } from "framer-motion";
import { menuItemShowAnimation } from "../../animations";
import MenuItems from "./MenuItems";

type MenuSectionsProps = {
  filteredCategories: Category[];
  menuItems: MenuItem[] | null;
  categories: Category[];
};

const MenuSections = ({
  filteredCategories,
  menuItems,
  categories,
}: MenuSectionsProps) => {
  if (filteredCategories.length <= 0) {
    return (
      <p className="italic text-white">
        "Meow? (Waiting for something to happen?)"
      </p>
    );
  }

  return (
    <motion.section
      {...menuItemShowAnimation(0.5)}
      className="flex flex-col items-start"
    >
      {filteredCategories.map((category) => (
        <section className="mt-5 flex flex-col gap-3" key={category.id}>
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
