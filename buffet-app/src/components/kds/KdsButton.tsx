import { Link } from "react-router-dom";
import { ButtonProps } from "../Button";

type KdsLinkTo = {
  linkTo: "souhrn" | "objednavky" | "uprava-menu";
};

type KdsButtonProps = ButtonProps & { linkTo: KdsLinkTo["linkTo"] };

const KdsButton = ({
  type,
  onClick,
  className,
  disabled,
  children,
  linkTo,
}: KdsButtonProps) => {
  return (
    <Link to={linkTo}>
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-36 bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 ${className}`}
      >
        {children}
      </button>
    </Link>
  );
};

export default KdsButton;
