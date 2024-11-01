import { Link } from "react-router-dom";
import Logo from "../assets/images/logo.svg";
import Navbar from "./nav/Navbar";
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const Header = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = (): void => {
      if (window.scrollY > 10) {
        controls.start({ height: "5rem" });
      } else {
        controls.start({ height: "7rem" });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <motion.header
      animate={controls}
      transition={{ duration: 0.2 }}
      className={`fixed z-50 flex h-28 w-full flex-row items-center justify-between bg-primary px-10 text-xl text-black shadow-lg shadow-black md:px-32`}
    >
      <Link to={"/"}>
        <img
          src={Logo}
          alt="Hamburger Logo"
          className={`w-[100px] min-w-[100px] rounded-full bg-white p-1 md:hover:animate-wiggle`}
        />
      </Link>

      <Navbar />
    </motion.header>
  );
};

export default Header;
