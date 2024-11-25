import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import SchoolLogo from "../../assets/images/logo-white_alfa.png";
import Navbar from "../nav/Navbar";
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
      className={`fixed z-50 flex h-28 w-full flex-row items-center justify-between overflow-hidden bg-primary px-10 text-xl text-black shadow-lg shadow-black md:px-32`}
    >
      <Link to={"/"}>
        <img
          src={Logo}
          alt="Hamburger Logo"
          className={`z-[55] w-[100px] min-w-[100px] rounded-full bg-white p-1 md:hover:animate-wiggle`}
        />
      </Link>
      <img
        src={SchoolLogo}
        alt="School Logo"
        className={`absolute right-1/2 translate-x-1/2`}
      />

      <Navbar />
    </motion.header>
  );
};

export default Header;
