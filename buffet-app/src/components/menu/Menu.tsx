import { lazy, Suspense } from "react";
import { useUser } from "../../hooks/useUser";
import { Fallback } from "../../main.tsx";
import UserMenu from "./UserMenu.tsx";

const MenuEdit = lazy(() => import("./editMenu/MenuEdit.tsx"));
// const UserMenu = lazy(() => import("./UserMenu.tsx"));

const Menu = () => {
  const { isAdmin } = useUser();

  return isAdmin ? (
    <Suspense fallback={<Fallback />}>
      <MenuEdit />
    </Suspense>
  ) : (
    // <Suspense fallback={<Fallback />}>
    <UserMenu />
    // </Suspense>
  );
};

export default Menu;
