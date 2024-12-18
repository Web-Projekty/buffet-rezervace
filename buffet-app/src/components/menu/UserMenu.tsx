import { useEffect, useState } from "react";
import { FETCH_URL, ITEMS_PER_PAGE } from "../../constants";
import { Category, MenuData } from "../../types";
import ErrorComponent from "../error/ErrorComponent";
import Loading from "../Loading";
import { useFetch } from "../../hooks/useFetch";
import MenuItem from "./MenuItem";
import HorizontalPaging from "../HorizontalPaging";

const UserMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { data, error, isLoading } = useFetch<MenuData>(FETCH_URL, {
    requestType: "getMenu",
    itemsCount: ITEMS_PER_PAGE + ITEMS_PER_PAGE,
    page: 1,
  });

  useEffect(() => {
    if (data) {
      setCategories(data.categoryList);
    }
  }, [data]);

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
      <h1 className="text-3xl font-bold text-white">Menu</h1>

      {data && data.data.length <= 0 ? (
        <p className="italic text-white">
          "Meow? (Waiting for something to happen?)"
        </p>
      ) : (
        <div className="mx-[40rem] flex flex-col items-start">
          {categories?.map((category) => (
            <div className="mt-5 flex flex-col gap-5" key={category.id}>
              <div className="flex justify-between">
                <h1 className="text-4xl font-bold text-white">
                  {category.name}
                </h1>
                <div className="mr-5 text-white">{category.description}</div>
              </div>

              <HorizontalPaging>
                {data &&
                  data.data
                    ?.filter(
                      (item) =>
                        categories.length > 0 && item.category === category.id,
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
