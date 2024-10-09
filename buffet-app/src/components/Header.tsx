import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import Navbar from "./Navbar";
import { useEffect, useState } from "react";

const Header = () => {
  const [isShrunk, setIsShrunk] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed z-50 flex ${isShrunk ? "h-14" : "h-28"} w-full flex-row items-center justify-between bg-primary px-10 text-xl text-black shadow-lg shadow-black md:px-32`}
    >
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
