import { scaleUpAnimation } from "../../animations/animations";
import { Allergen as AllergenType } from "../../types/types";
import { motion } from "framer-motion";

type AlergenProps = {
  allergen: AllergenType;
};

const Allergen = ({ allergen }: AlergenProps) => {
  return (
    <motion.li
      {...scaleUpAnimation(0.5)}
      className="relative flex w-[18rem] items-center gap-2 rounded-lg bg-slate-900 px-3 py-6"
    >
      <p className="text-4xl">{allergen.icon ? allergen.icon : null}</p>
      <span className="rounded-full bg-slate-800 px-4 py-2 text-xl">
        {allergen.id}
      </span>
      <div className="flex flex-col">
        <span className="font-bold">{allergen.name}</span>
        <p className="text-descriptionColor">{allergen.description}</p>
      </div>
    </motion.li>
  );
};

export default Allergen;
