import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="fixed z-50 flex h-28 w-full flex-row items-center justify-between bg-orange-300 px-32 text-xl text-black shadow-sm shadow-gray-500">
      <Link to={"/"}>
        <img
          src={Logo}
          width={100}
          alt="Hamburger Logo"
          className="rounded-full bg-white p-1 hover:animate-wiggle"
        />
      </Link>

      <Navbar />
    </header>
  );
};

export default Header;
