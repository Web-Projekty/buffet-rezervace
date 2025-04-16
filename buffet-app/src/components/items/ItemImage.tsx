import { useState } from "react";
import { Allergen } from "../../types/types";
import LazyImage from "../ui/LazyImage";
import { AnimatePresence, motion } from "framer-motion";
import ItemAllergensInfo from "./ItemAllergensInfo";
import ItemAllergens from "./ItemAllergens";

type ItemImageProps = {
  image: string;
  name: string;
  allergens: Allergen[];
  description: string;
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
};

const ItemImage = ({ image, name, allergens }: ItemImageProps) => {
  const [showAllergens, setShowAllergens] = useState<boolean>(false);

  const handleShowInfo = () => {
    setShowAllergens(!showAllergens);
  };

  return (
    <div className="relative cursor-pointer" onClick={handleShowInfo}>
      <LazyImage image={image} alt={name} className="rounded-md shadow-md" />
      <AnimatePresence>
        {showAllergens ? (
          <motion.div
            key="info"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemVariants}
            transition={{ duration: 0.3 }}
          >
            <ItemAllergensInfo allergens={allergens} />
          </motion.div>
        ) : (
          <motion.div
            key="allergens"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={itemVariants}
            transition={{ duration: 0.3 }}
          >
            <ItemAllergens allergens={allergens} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ItemImage;
