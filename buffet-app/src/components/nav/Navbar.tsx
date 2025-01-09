import CartButton from "../cart/CartButton";
import AccountButton from "../auth/AccountButton";
import { Menu } from "lucide-react";
import { lazy, Suspense, useState } from "react";
import Link from "./Link";
import { useUser } from "../../hooks/useUser";
import { AnimatePresence } from "framer-motion";

const MobileNavbar = lazy(() => import("./MobileNavbar"));

export type NavLinks = {
  id: number;
  name: string;
  path: string;
  requireAdmin?: boolean;
};

const NavLinks: NavLinks[] = [
  { id: 1, name: "Menu", path: "/" },
  { id: 2, name: "Alergeny", path: "/alergeny" },
  { id: 3, name: "KDS", path: "/kds", requireAdmin: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, isAdmin } = useUser();

  const handleOpenMobileMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      <div className="hidden flex-row md:flex">
        <ul className="relative flex w-auto flex-row items-center justify-between gap-5 text-xl text-black">
          {NavLinks.map(({ id, path, name, requireAdmin }) => {
            if (requireAdmin && (!user || !isAdmin)) {
              return null;
            }
            return <Link key={id} path={path} name={name} />;
          })}
          <div className="flex flex-row gap-5">
            {!isAdmin && <CartButton />}
            <AccountButton />
          </div>
        </ul>
      </div>
      <div className="z-50 flex flex-col rounded-full text-white md:hidden">
        <Menu size={64} onClick={handleOpenMobileMenu} />
      </div>
      <AnimatePresence>
        {isOpen && (
          <Suspense fallback={<></>}>
            <MobileNavbar
              isOpen={isOpen}
              handleOpenMobileMenu={handleOpenMobileMenu}
              isAdmin={user ? user.isAdmin : false}
              links={NavLinks}
            />
          </Suspense>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
