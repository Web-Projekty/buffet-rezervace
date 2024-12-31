type MenuCategoryProps = {
  name: string;
  image: string;
  handleFilter: (filter: string) => void;
  filterValue: string;
};

const MenuCategory = ({
  name,
  image,
  handleFilter,
  filterValue = "",
}: MenuCategoryProps) => {
  return (
    <div
      className="flex h-10 w-auto cursor-pointer flex-row items-center justify-center gap-3 rounded-xl bg-slate-900 p-4"
      onClick={() => handleFilter(filterValue)}
    >
      <img src={image} alt={name + "'s image"} />
      <h1>{name}</h1>
    </div>
  );
};

export default MenuCategory;
