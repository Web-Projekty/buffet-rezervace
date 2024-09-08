import { NavLink } from "react-router-dom";

const Links = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Menu", path: "/menu" },
  { id: 3, name: "About", path: "/about" },
  { id: 4, name: "Contact", path: "/contact" },
];

const Navbar = () => {
  return (
    <nav>
      <ul className="flex gap-10">
        {Links.map((link) => {
          return (
            <li key={link.id}>
              <NavLink
                className={({ isActive }) => (isActive ? "font-bold" : "")}
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
