import { allergens } from "../../dummyData";
import Allergen from "./Allergen";

const Allergens = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-5 text-white">
      <h1 className="text-center text-3xl font-bold">Seznam alergenů</h1>
      <ul className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {allergens.map((item) => (
          <Allergen key={item.id} allergen={item} />
        ))}
      </ul>
    </div>
  );
};

export default Allergens;
