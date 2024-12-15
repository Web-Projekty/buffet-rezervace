type MenuEditBarProps = {
  handleBarOpen: () => void;
};

const MenuEditBar = ({ handleBarOpen }: MenuEditBarProps) => {
  return (
    <div
      className="absolute right-0 z-10 h-screen w-20 bg-green-300"
      onClick={handleBarOpen}
    >
      Úprava
    </div>
  );
};

export default MenuEditBar;
