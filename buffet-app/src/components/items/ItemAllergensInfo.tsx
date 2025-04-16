import { allergens as AllergensList } from "../../data/allergens";
import { Allergen } from "../../types/types";

type ItemAllergensInfoProps = {
  allergens: Allergen[];
};

const ItemAllergensInfo = ({ allergens }: ItemAllergensInfoProps) => {
  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 max-h-48 overflow-y-auto rounded-b-md bg-slate-900 bg-opacity-75 px-5 py-2 text-white">
      <ul className="flex flex-col">
        {allergens.map((allergen) => (
          <li key={allergen.id} className="list-disc">
            {AllergensList.find((a) => a.id === allergen.id)?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ItemAllergensInfo;
