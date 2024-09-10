import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import Navbar from "./Navbar";
import { LuShoppingCart } from "react-icons/lu";

const Header = () => {
  return (
    <header className="fixed z-50 flex h-40 w-full flex-row items-center justify-evenly bg-orange-300 text-xl text-black shadow-sm shadow-gray-500">
      <Link>
        <img
          src={Logo}
          width={140}
          alt="Hamburger Logo"
          className="rounded-full bg-white p-1"
        />
      </Link>
      <Navbar />
      <div className="rounded-full bg-white p-4 hover:cursor-pointer">
        <LuShoppingCart size={48} />
      </div>
    </header>
  );
};

export default Header;
