import { scaleUpAnimation } from "../../animations";
import { Allergen as AllergenType } from "../../types";
import { motion } from "framer-motion";

type AlergenProps = {
  allergen: AllergenType;
};

const Allergen = ({ allergen }: AlergenProps) => {
  return (
    <motion.li
      {...scaleUpAnimation(0.5)}
      className="flex items-center gap-2 rounded-md bg-slate-900 p-2"
    >
      <span className="rounded-full bg-slate-800 px-4 py-2 text-xl">
        {allergen.id}
      </span>
      <span className="font-FiraSans">{allergen.name}</span>
    </motion.li>
  );
};

export default Allergen;
