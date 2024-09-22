import { NavLink } from "react-router-dom";
import CartButton from "./cart/CartButton";
import AccountButton from "./account/AccountButton";
import { IoIosMenu } from "react-icons/io";

type NavLinksType = {
  id: number;
  name: string;
  path: string;
};

const Links: NavLinksType[] = [
  { id: 1, name: "Menu", path: "/" },
  { id: 2, name: "Alergeny", path: "/alergeny" },
  { id: 3, name: "Recenze", path: "/recenze" },
];

const Navbar = () => {
  return (
    <nav>
      <div className="hidden flex-row md:flex">
        <ul className="relative flex w-[500px] flex-row items-center justify-between text-xl text-black">
          {Links.map(({ id, path, name }) => {
            return (
              <li key={id}>
                <NavLink
                  className={({ isActive }) =>
                    isActive
                      ? "flex cursor-default flex-row items-center justify-center rounded-lg bg-white p-2 font-bold"
                      : "flex flex-row items-center justify-center p-2"
                  }
                  to={path}
                >
                  {name}
                </NavLink>
              </li>
            );
          })}
          <div className="flex flex-row gap-5">
            <CartButton />
            <AccountButton />
          </div>
        </ul>
      </div>
      <div className="flex flex-col rounded-full bg-white p-[18px] md:hidden">
        <IoIosMenu size={64} />
      </div>
    </nav>
  );
};

export default Navbar;
