import { BiFoodMenu } from "react-icons/bi";
import { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { LuShoppingCart } from "react-icons/lu";

type NavLinksType = {
  id: number;
  name: string;
  path: string;
  image?: ReactNode;
};

const Links: NavLinksType[] = [
  { id: 1, name: "Menu", path: "/", image: <BiFoodMenu /> },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Reviews", path: "/reviews" },
];

const Navbar = () => {
  return (
    <nav>
      <div className="flex flex-row">
        <ul className="relative flex flex-row items-center gap-5 text-xl text-black">
          {Links.map(({ id, path, name, image }) => {
            return (
              <li key={id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex flex-row items-center gap-2 rounded-lg bg-white p-2 font-bold"
                      : "flex flex-row items-center gap-2"
                  }
                  to={path}
                >
                  {name}
                  {image}
                </NavLink>
              </li>
            );
          })}
          <div className="rounded-full bg-white p-4 hover:cursor-pointer">
            <LuShoppingCart size={24} />
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
