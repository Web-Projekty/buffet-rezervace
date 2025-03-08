import { useState } from "react";
import { Category } from "../../../types";
import Button from "../../ui/Button";
import MenuItemEditInput from "./MenuItemEditInput";
import { onImageChange } from "../../utils/utils";
import { motion } from "framer-motion";
import { slideInAnimation } from "../../../animations";
import { createCategory, updateCategory } from "../../utils/api";
import { useUser } from "../../../hooks/useUser";
import ImageInput from "../../ui/ImageInput";

type MenuCategoryEditBarProps = {
  handleBarOpen: () => void;
  category: Category | null;
};

const MenuCategoryEditBar = ({
  handleBarOpen,
  category,
}: MenuCategoryEditBarProps) => {
  const { token } = useUser();
  const [itemImage, setItemImage] = useState<string>(category?.image || "");
  const [itemName, setItemName] = useState<string>(category?.name || "");
  const [itemDescription, setItemDescription] = useState<string>(
    category?.description || "",
  );

  const handleSave = async () => {
    handleClose();

    const data = {
      name: itemName,
      description: itemDescription,
      image: itemImage,
    };

    if (!category) {
      const { error } = await createCategory(token, data);

      if (error) {
        console.log("Error creating item");
        return;
      }
      return;
    }

    const { error } = await updateCategory(token, {
      categoryId: category.id,
      ...data,
    });

    if (error) {
      console.log("Error updating item");
      return;
    }
  };

  const handleClose = () => {
    handleBarOpen();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageChange(e, setItemImage);
  };

  return (
    <motion.aside
      {...slideInAnimation(0.2)}
      className="sticky top-0 h-screen flex-shrink-0"
    >
      <div className="sticky right-3 top-0 z-10 flex w-[24rem] flex-col gap-5 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black">
        <h1 className="text-center text-xl font-bold">Úprava kategorie</h1>
        <div className="flex w-full flex-col gap-4">
          <ImageInput
            itemImage={itemImage}
            itemName={itemName}
            handleImageChange={handleImageChange}
          />

          <MenuItemEditInput
            label="Název"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            id="categoryName"
            type="text"
          />

          <textarea
            id="categoryDescription"
            className="max-h-[3.5rem] min-h-[2rem] w-full rounded-md p-1 text-black focus:outline-none"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Popis"
          />
        </div>
        <div className="flex flex-row">
          <Button
            className="m-auto border-red-400 bg-red-400 hover:bg-red-500"
            onClick={handleClose}
          >
            Zrušit
          </Button>
          <Button className="m-auto" onClick={handleSave}>
            Uložit
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default MenuCategoryEditBar;
