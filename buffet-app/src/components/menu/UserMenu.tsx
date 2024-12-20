import ErrorComponent from "../error/ErrorComponent";
import Loading from "../Loading";
import MenuItem from "./MenuItem";
import HorizontalPaging from "../HorizontalPaging";
import useMenu from "../../hooks/useMenu";

const UserMenu = () => {
  const { menuItems, error, isLoading, categories } = useMenu();

  if (isLoading) {
    return <Loading size={30} />;
  }

  if (error) {
    return (
      <ErrorComponent title="Načítání položek se nezdařilo." subtitle="🛠️👷" />
    );
  }
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h1 className="text-3xl font-bold text-white">Naše menu</h1>
      <div className="flex flex-row items-center justify-center gap-5 text-white">
        {categories.map((category) => {
          return (
            <div
              key={category.name}
              className="flex h-10 w-auto flex-row items-center justify-center gap-3 rounded-xl bg-slate-900 p-4"
            >
              <img src={category.image} alt={category.name + "'s image"} />
              <h1>{category.name}</h1>
            </div>
          );
        })}
      </div>
      {menuItems && menuItems.length <= 0 ? (
        <p className="italic text-white">
          "Meow? (Waiting for something to happen?)"
        </p>
      ) : (
        <div className="mx-[40rem] flex flex-col items-start">
          {categories &&
            categories.map((category) => (
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
