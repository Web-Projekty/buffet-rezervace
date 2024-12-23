import { lazy, Suspense } from "react";
import { useUser } from "../../hooks/useUser";
import { Fallback } from "../../main.tsx";

const MenuEdit = lazy(() => import("./editMenu/MenuEdit"));
const UserMenu = lazy(() => import("./UserMenu"));

const Menu = () => {
  const { isAdmin } = useUser();

  return isAdmin ? (
    <Suspense fallback={<Fallback />}>
      <MenuEdit />
    </Suspense>
  ) : (
    <Suspense fallback={<Fallback />}>
      <UserMenu />
    </Suspense>
  );
};

export default Menu;
