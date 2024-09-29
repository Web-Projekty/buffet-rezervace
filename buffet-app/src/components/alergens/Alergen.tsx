import { Alergen as AlergenType } from "../../types";
import { motion } from "framer-motion";

const Alergen = ({ alergen }: { alergen: AlergenType }) => {
  return (
    <motion.li
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-2 rounded-md bg-slate-900 p-2"
    >
      <span className="rounded-full bg-slate-800 px-4 py-2 text-xl">
        {alergen.id}
      </span>
      <span>{alergen.name}</span>
    </motion.li>
  );
};

export default Alergen;
