import { alergens } from "../../dummyData";
import { Alergen as AlergenType } from "../../types";
import Alergen from "./Alergen";

const Alergens = () => {
  return (
    <div className="mb-[3rem] mt-[10rem] flex flex-col items-center justify-center gap-5 text-white">
      <h1 className="text-center text-3xl font-bold">Seznam alergenů</h1>
      <ul className="grid grid-cols-2 gap-5 md:grid-cols-5">
        {alergens.map((item: AlergenType) => (
          <Alergen key={item.id} alergen={item} />
        ))}
      </ul>
    </div>
  );
};

export default Alergens;
