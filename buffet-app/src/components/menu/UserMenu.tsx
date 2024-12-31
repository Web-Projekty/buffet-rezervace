import ErrorComponent from "../error/ErrorComponent";
import Loading from "../ui/Loading";
import MenuItem from "./MenuItem";
import HorizontalPaging from "../ui/HorizontalPaging";
import useMenu from "../../hooks/useMenu";
import { useFilter } from "../../hooks/useFilter";
import MenuCategory from "./MenuCategory";

const UserMenu = () => {
  const { menuItems, error, isLoading, categories } = useMenu();
  const { data: filteredCategories, handleFilter } = useFilter(
    "name",
    "category",
    categories,
  );

  if (isLoading) {
    return <Loading size={30} />;
  }

  if (error) {
    return (
      <ErrorComponent title="Načítání položek se nezdařilo." subtitle="🛠️👷" />
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-1">
      <h1 className="text-3xl font-bold text-white">Naše menu</h1>
      <div className="flex flex-row items-center justify-center gap-5 text-white">
        <HorizontalPaging className="justify-center">
          <MenuCategory
            name="Vše"
            image={""}
            handleFilter={handleFilter}
            filterValue=""
          />
          {categories.map((category) => {
            return (
              <MenuCategory
                key={category.id}
                {...category}
                handleFilter={handleFilter}
                filterValue={category.name}
              />
            );
          })}
        </HorizontalPaging>
      </div>
      {filteredCategories && filteredCategories.length <= 0 ? (
        <p className="italic text-white">
          "Meow? (Waiting for something to happen?)"
        </p>
      ) : (
        <div className="mx-[40rem] flex flex-col items-start">
          {filteredCategories &&
            filteredCategories.map((category) => (
              <div className="mt-5 flex flex-col gap-3" key={category.id}>
                <div className="mx-10 flex flex-col items-center gap-2 md:flex-row md:justify-between md:gap-0">
                  <h1 className="text-4xl font-bold text-white">
                    {category.name}
                  </h1>
                  <p className="text-white md:mr-5">{category.description}</p>
                </div>

                <HorizontalPaging>
                  {menuItems &&
                    menuItems
                      .filter(
                        (item) =>
                          categories.length > 0 &&
                          item.category === category.id,
                      )
                      .map((item) => <MenuItem key={item.id} item={item} />)}
                </HorizontalPaging>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default UserMenu;
