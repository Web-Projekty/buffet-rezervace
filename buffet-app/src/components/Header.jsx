import { Link } from "react-router-dom";
import Logo from "/logo.svg";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="fixed flex h-40 w-full flex-row items-center justify-around bg-orange-200 text-xl text-black shadow-md shadow-slate-600">
      <Link>
        <img src={Logo} width={180} alt="Hamburger Logo" />
      </Link>
      <Navbar />
    </header>
  );
};

export default Header;
