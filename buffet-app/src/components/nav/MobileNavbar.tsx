import { motion } from "framer-motion";
import SchoolLogo from "../../assets/images/logo-white_alfa.png";
import { X } from "lucide-react";
import Link from "./Link";
import { NavLinks } from "./Navbar";

type MobileNavbarProps = {
  isOpen: boolean;
  handleOpenMobileMenu: () => void;
  isAdmin: boolean;
  links: NavLinks[];
};

const MobileNavbar = ({
  isOpen,
  handleOpenMobileMenu,
  isAdmin,
  links,
}: MobileNavbarProps) => {
  return (
    <motion.ul
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      exit={"closed"}
      variants={{
        open: { x: 0, opacity: 1, display: "flex" },
        closed: { x: "-100%", opacity: 0, display: "none" },
      }}
      transition={{ duration: 0.3 }}
      className="fixed bottom-0 left-0 right-0 top-0 z-40 flex h-screen w-screen flex-col items-center justify-center gap-5 overflow-hidden bg-primary text-xl text-white"
    >
      <img
        src={SchoolLogo}
        alt="School Logo"
        className={`absolute right-1/2 translate-x-1/2 scale-150`}
      />
      <li className="absolute right-5 top-5">
        <X size={64} onClick={handleOpenMobileMenu} />
      </li>
      <div className="z-[45] flex flex-col gap-10">
        {links.map(({ id, path, name, requireAdmin }) => {
          if (requireAdmin && !isAdmin) {
            return null;
          }
          return <Link key={id} path={path} name={name} />;
        })}
      </div>
    </motion.ul>
  );
};

export default MobileNavbar;
