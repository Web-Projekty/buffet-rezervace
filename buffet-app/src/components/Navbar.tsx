import { NavLink } from "react-router-dom";

interface NavLinksType {
  id: number;
  name: string;
  path: string;
}

const Links: NavLinksType[] = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Menu", path: "/menu" },
  { id: 3, name: "About", path: "/about" },
  { id: 4, name: "Contact", path: "/contact" },
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
