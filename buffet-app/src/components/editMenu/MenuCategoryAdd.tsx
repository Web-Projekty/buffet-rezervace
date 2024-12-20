import Button from "../Button";

type MenuCategoryAddProps = {
  handleCategoryBarOpen: (id?: number) => void;
  isCategoryBarOpen: boolean;
};

const MenuCategoryAdd = ({
  handleCategoryBarOpen,
  isCategoryBarOpen,
}: MenuCategoryAddProps) => {
  return (
    <Button
      disabled={isCategoryBarOpen}
      onClick={() => handleCategoryBarOpen()}
      className="bg-transparent hover:bg-opacity-10"
    >
      Přidat kategorii
    </Button>
  );
};

export default MenuCategoryAdd;
