import { NavLink } from "react-router-dom";
import CartButton from "../cart/CartButton";
import AccountButton from "../auth/AccountButton";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "../../types";
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import SchoolLogo from "../../assets/images/logo-white_alfa.png";

type NavLinks = {
  id: number;
  name: string;
  path: string;
  requireAdmin?: boolean;
};

type LinksProps = {
  user: User;
};

type MobileNavbarProps = {
  isOpen: boolean;
  handleOpenMobileMenu: () => void;
  user: User;
};

const NavLinks: NavLinks[] = [
  { id: 1, name: "Menu", path: "/" },
  { id: 2, name: "Alergeny", path: "/alergeny" },
  { id: 3, name: "Objednávky", path: "/objednavky", requireAdmin: true },
];

const Links = ({ user }: LinksProps) => {
  return NavLinks.map(({ id, path, name, requireAdmin }) => {
    if (requireAdmin && (!user || !user?.isAdmin)) {
      return null;
    }

    return (
      <li key={id}>
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "flex cursor-default flex-row items-center justify-center rounded-lg p-2 font-bold md:bg-white"
              : "flex flex-row items-center justify-center p-2"
          }
          to={path}
        >
          {name}
        </NavLink>
      </li>
    );
  });
};

const MobileNavbar = ({
  isOpen,
  handleOpenMobileMenu,
  user,
}: MobileNavbarProps) => {
  return (
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
      <img
        src={SchoolLogo}
        alt="School Logo"
        className={`absolute right-1/2 translate-x-1/2 scale-150`}
      />
      <li className="absolute right-5 top-5">
        <X size={64} onClick={handleOpenMobileMenu} />
      </li>
      <Links user={user} />
    </motion.ul>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const user: User | null = useAuthUser()!;

  const handleOpenMobileMenu = (): void => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="relative">
      <div className="hidden flex-row md:flex">
        <ul className="relative flex w-auto flex-row items-center justify-between gap-5 text-xl text-black">
          <Links user={user} />
          <div className="flex flex-row gap-5">
            <CartButton />
            <AccountButton />
          </div>
        </ul>
      </div>
      <div className="z-50 flex flex-col rounded-full text-white md:hidden">
        <Menu size={64} onClick={handleOpenMobileMenu} />
      </div>

      <MobileNavbar
        isOpen={isOpen}
        handleOpenMobileMenu={handleOpenMobileMenu}
        user={user}
      />
    </nav>
  );
};

export default Navbar;
