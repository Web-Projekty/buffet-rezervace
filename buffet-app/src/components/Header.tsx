import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="fixed z-50 flex h-28 w-full flex-row items-center justify-between bg-primary px-10 text-xl text-black shadow-lg shadow-black md:px-32">
      <Link to={"/"}>
        <img
          src={Logo}
          alt="Hamburger Logo"
          className="w-[100px] min-w-[100px] rounded-full bg-white p-1 md:hover:animate-wiggle"
        />
      </Link>

      <Navbar />
    </header>
  );
};

export default Header;
