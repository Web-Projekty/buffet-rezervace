import { Allergen } from "../../types";

type MenuItemAllergensProps = {
  allergens: Allergen[];
};

const MenuItemAllergens = ({ allergens }: MenuItemAllergensProps) => {
  return (
    <ul className="absolute bottom-0 m-1 flex flex-row gap-1">
      {allergens.map((allergen) => (
        <li key={allergen.id} className="rounded-full bg-slate-600 p-1 px-3">
          {allergen.id}
        </li>
      ))}
    </ul>
  );
};

export default MenuItemAllergens;
