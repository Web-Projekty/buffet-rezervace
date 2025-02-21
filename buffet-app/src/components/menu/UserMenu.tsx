import ErrorComponent from "../error/ErrorComponent";
import Loading from "../ui/Loading";
import useMenu from "../../hooks/useMenu";
import MenuCategories from "./MenuCategories";
import MenuSections from "./MenuSections";
import { useCallback, useRef } from "react";

const UserMenu = () => {
  const { menuItems, error, isLoading, categories } = useMenu();
  const categoryRefs = useRef<{ [key: number]: HTMLElement | null }>({});

  const handleFilter = useCallback((categoryId: number) => {
    const element = categoryRefs.current[categoryId];
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  if (error) {
    return (
      <ErrorComponent title="Načítání položek se nezdařilo." subtitle="🛠️👷" />
    );
  }

  return (
    <section className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-white">Naše menu</h1>
      {!isLoading ? (
        <>
          <MenuCategories
            categories={categories.filter((category) =>
              menuItems?.some((item) => item.category === category.id),
            )}
            onFilter={handleFilter}
          />
          <MenuSections
            menuItems={menuItems}
            categories={categories.filter((category) =>
              menuItems?.some((item) => item.category === category.id),
            )}
            refs={categoryRefs}
          />
        </>
      ) : (
        <Loading size={30} />
      )}
    </section>
  );
};

export default UserMenu;
