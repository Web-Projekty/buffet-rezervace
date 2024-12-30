import { NavLink } from "react-router-dom";
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
    <NavLink
      className={({ isActive, isPending }) =>
        isPending
          ? "bg-blue-200"
          : isActive
            ? "cursor-default bg-blue-400"
            : "bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
      }
      to={linkTo}
    >
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`w-36 px-4 py-2 text-white disabled:bg-gray-400 ${className}`}
      >
        {children}
      </button>
    </NavLink>
  );
};

export default KdsButton;
