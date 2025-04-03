import { Allergen } from "../../types/types";
import { allergens as AllergensList } from "../../data/allergens";

type ItemAllergensProps = {
  allergens: Allergen[];
};

const ItemAllergens = ({ allergens }: ItemAllergensProps) => {
  return (
    <ul className="absolute bottom-0 m-1 flex flex-row gap-1">
      {allergens.map((allergen) => (
        <li
          key={allergen.id}
          className="rounded-full bg-slate-600 p-1 px-3"
          title={AllergensList.find((a) => a.id === allergen.id)?.description}
        >
          {allergen.id}
        </li>
      ))}
    </ul>
  );
};

export default ItemAllergens;
