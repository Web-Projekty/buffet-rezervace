import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="fixed z-50 flex h-40 w-full flex-row items-center justify-around bg-orange-200 text-xl text-black shadow-sm shadow-gray-500">
      <Link>
        <img
          src={Logo}
          width={140}
          alt="Hamburger Logo"
          className="rounded-full bg-white p-2"
        />
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
