import ErrorComponent from "../error/ErrorComponent";
import Loading from "../ui/Loading";
import useMenu from "../../hooks/useMenu";
import { useFilter } from "../../hooks/useFilter";
import MenuCategories from "./MenuCategories";
import MenuSections from "./MenuSections";

const UserMenu = () => {
  const { menuItems, error, isLoading, categories } = useMenu();
  const { data: filteredCategories, handleFilter } = useFilter(
    "name",
    "category",
    categories,
  );

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
          <MenuCategories categories={categories} onFilter={handleFilter} />
          <MenuSections
            filteredCategories={filteredCategories}
            menuItems={menuItems}
            categories={categories}
          />
        </>
      ) : (
        <Loading size={30} />
      )}
    </section>
  );
};

export default UserMenu;
