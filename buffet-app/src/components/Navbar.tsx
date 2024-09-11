import { NavLink } from "react-router-dom";

type NavLinksType = {
  id: number;
  name: string;
  path: string;
};

const Links: NavLinksType[] = [
  { id: 1, name: "Menu", path: "/" },
  { id: 2, name: "About", path: "/about" },
  { id: 3, name: "Reviews", path: "/reviews" },
];

const Navbar = () => {
  return (
    <nav>
      <ul className="flex flex-wrap gap-16">
        {Links.map((link) => {
          return (
            <li key={link.id}>
              <NavLink
                className={({ isActive }) =>
                  isActive ? "rounded-full bg-white p-2 font-bold" : ""
                }
                to={link.path}
              >
                {link.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
