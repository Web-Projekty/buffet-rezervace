import { useUser } from "../../hooks/useUser";
import MenuEdit from "./MenuEdit";
import UserMenu from "./UserMenu";

const Menu = () => {
  const { isAdmin } = useUser();

  return isAdmin ? <MenuEdit /> : <UserMenu />;
};

export default Menu;
