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
      className="flex w-[22rem] items-center gap-2 rounded-lg bg-slate-900 p-3"
    >
      <img
        src={
          "https://t4.ftcdn.net/jpg/04/73/25/49/360_F_473254957_bxG9yf4ly7OBO5I0O5KABlN930GwaMQz.jpg"
        }
        alt={allergen.name + "'s image"}
        className="w-[8rem] rounded-lg object-cover"
      />
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
