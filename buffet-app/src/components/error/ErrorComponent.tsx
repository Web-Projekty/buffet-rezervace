import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Logo from "../../assets/images/logo.svg";
import { motion } from "framer-motion";
import { fadeInAnimation } from "../../animations";

type Error = {
  title: string;
  subtitle: string;
  onBack?: () => void;
  linkTo?: string;
  className?: string;
};

const ErrorComponent = ({
  title,
  subtitle,
  onBack,
  linkTo,
  className,
}: Error) => {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-5 overflow-x-hidden bg-slate-800 font-sans text-white ${className}`}
    >
      <motion.img
        {...fadeInAnimation(0.5)}
        src={Logo}
        alt="Hamburger Logo"
        className={`h-[248px] w-[248px] animate-slowWiggle rounded-full bg-white`}
      />

      <div className="flex flex-col items-center gap-1">
        <h1 className="text-2xl">{title}</h1>
        <span className="text-4xl">{subtitle}</span>
      </div>
      <Link to={linkTo ? linkTo : "/"} onClick={onBack}>
        <Button>Zpět na hlavní stránku</Button>
      </Link>
    </div>
  );
};

export default ErrorComponent;
