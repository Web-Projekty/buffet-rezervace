import { NavLink } from "react-router-dom";

type LinkProps = {
  path: string;
  name: string;
  classNameActive?: string;
  classNameInActive?: string;
  className?: string;
  onClick?: () => void;
};

const Link = ({
  path,
  name,
  onClick,
  classNameActive = "",
  classNameInActive = "",
  className = "",
}: LinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? `flex cursor-default flex-row items-center justify-center rounded-lg p-2 font-bold md:bg-white ${classNameActive + " " + className}`
          : `flex flex-row items-center justify-center p-2 ${classNameInActive + " " + className}`
      }
      to={path}
      onClick={onClick}
    >
      {name}
    </NavLink>
  );
};

export default Link;
