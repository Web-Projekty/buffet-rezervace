import { NavLink } from "react-router-dom";

type LinkProps = {
  path: string;
  name: string;
};

const Link = ({ path, name }: LinkProps) => {
  return (
    <NavLink
      className={({ isActive }) =>
        isActive
          ? "flex cursor-default flex-row items-center justify-center rounded-lg p-2 font-bold md:bg-white"
          : "flex flex-row items-center justify-center p-2"
      }
      to={path}
    >
      {name}
    </NavLink>
  );
};

export default Link;
