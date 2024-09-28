import { NavLink } from "react-router-dom";
import CartButton from "./cart/CartButton";
import AccountButton from "./account/AccountButton";
import { IoIosMenu, IoIosClose } from "react-icons/io";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "../types";
import { dummyUser } from "../dummyData";
import { useState } from "react";
import { motion } from "framer-motion";

type NavLinksType = {
  id: number;
  name: string;
  path: string;
  requireAdmin?: boolean;
};

const Links: NavLinksType[] = [
  { id: 1, name: "Menu", path: "/" },
  { id: 2, name: "Alergeny", path: "/alergeny" },
  { id: 3, name: "Objednávky", path: "/objednavky", requireAdmin: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user: User = dummyUser; //useAuthUser();

  const handleOpenMobileMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      <div className="hidden flex-row md:flex">
        <ul className="relative flex w-auto flex-row items-center justify-between gap-5 text-xl text-black">
          {Links.map(({ id, path, name, requireAdmin }) => {
            return requireAdmin && !user?.isAdmin ? null : (
              <li key={id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex cursor-default flex-row items-center justify-center rounded-lg bg-white p-2 font-bold"
                      : "flex flex-row items-center justify-center p-2"
                  }
                  to={path}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
          <div className="flex flex-row gap-5">
            <CartButton />
            <AccountButton />
          </div>
        </ul>
      </div>
      <div className="z-50 flex flex-col rounded-full bg-white p-[18px] md:hidden">
        <IoIosMenu size={64} onClick={handleOpenMobileMenu} />
      </div>

      <motion.ul
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { x: 0, opacity: 1 },
          closed: { x: "-100%", opacity: 0 },
        }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-0 left-0 right-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-5 bg-primary text-xl text-white"
      >
        <li className="absolute right-5 top-5">
          <IoIosClose size={64} onClick={handleOpenMobileMenu} />
        </li>
        {Links.map(({ id, path, name, requireAdmin }) => {
          return requireAdmin && !user?.isAdmin ? null : (
            <li key={id}>
              <NavLink
                className="flex flex-row items-center justify-center p-2"
                to={path}
                onClick={handleOpenMobileMenu}
              >
                {name}
              </NavLink>
            </li>
          );
        })}
      </motion.ul>
    </nav>
  );
};

export default Navbar;
