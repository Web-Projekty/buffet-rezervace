import { Link } from "react-router-dom";
import Logo from "../../assets/images/logo.svg";
import SchoolLogo from "../../assets/images/logo-white_alfa.png";
import Navbar from "../nav/Navbar";
import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { fadeInAnimation } from "../../animations";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const controls = useAnimation();

  const toggleMobileMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  useEffect(() => {
    if (!isOpen) {
      const handleScroll = (): void => {
        controls.start({ height: window.scrollY > 10 ? "5rem" : "7rem" });
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, [controls, isOpen]);

  return (
    <motion.header
      animate={controls}
      transition={{ duration: 0.2 }}
      className={`fixed z-50 flex h-28 w-full flex-row items-center justify-between overflow-hidden bg-primary px-10 text-xl text-black shadow-lg shadow-black md:px-32`}
    >
      <Link
        to={"/"}
        className={`z-[55] h-[100px] w-[100px] rounded-full bg-white p-1`}
      >
        <motion.img
          {...fadeInAnimation(0.5)}
          src={Logo}
          alt="Hamburger Logo"
          className="md:hover:animate-wiggle"
        />
      </Link>
      <img
        src={SchoolLogo}
        alt="School Logo"
        className={`absolute right-1/2 translate-x-1/2`}
      />

      <Navbar isOpen={isOpen} toggleMobileMenu={toggleMobileMenu} />
    </motion.header>
  );
};

export default Header;
