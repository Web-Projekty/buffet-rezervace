import { lazy, Suspense, useEffect, useState } from "react";
import { useUser } from "../../hooks/useUser";
import { Fallback } from "../../main.tsx";

const MenuEdit = lazy(() => import("./editMenu/MenuEdit.tsx"));
const UserMenu = lazy(() => import("./UserMenu.tsx"));

const Menu = () => {
  const { isAdmin } = useUser();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) return <Fallback />;

  return (
    <Suspense fallback={<Fallback />}>
      {isAdmin ? <MenuEdit /> : <UserMenu />}
    </Suspense>
  );
};

export default Menu;
