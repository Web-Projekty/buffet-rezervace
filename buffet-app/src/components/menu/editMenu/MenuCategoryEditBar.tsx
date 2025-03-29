import { useState } from "react";
import { Category } from "../../../types";
import Button from "../../ui/Button";
import MenuItemEditInput from "./MenuItemEditInput";
import { onImageChange } from "../../utils/utils";
import { motion } from "framer-motion";
import { slideInAnimation } from "../../../animations";
import {
  createCategory,
  removeCategory,
  updateCategory,
  uploadImage,
} from "../../utils/api";
import { useUser } from "../../../hooks/useUser";
import ImageInput from "../../ui/ImageInput";
import toast from "react-hot-toast";

type MenuCategoryEditBarProps = {
  handleBarOpen: () => void;
  category: Category | null;
  refetch: () => void;
};

const MenuCategoryEditBar = ({
  handleBarOpen,
  category,
  refetch,
}: MenuCategoryEditBarProps) => {
  const { token } = useUser();
  const [itemImage, setItemImage] = useState<Category["image"]>(
    category?.image || "",
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [itemName, setItemName] = useState<Category["name"]>(
    category?.name || "",
  );
  const [itemDescription, setItemDescription] = useState<
    Category["description"]
  >(category?.description || "");

  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleSave = async () => {
    handleClose();

    const data = {
      name: itemName,
      description: itemDescription,
    };

    if (!category) {
      const { categoryId, error } = await createCategory(token, data);

      if (error) {
        toast.error("Kategorie se nepodařilo vytvořit");
        return;
      }

      if (imageFile) {
        await uploadImage(token, categoryId, "categories", imageFile);
      }

      toast.success("Kategorie byla úspěšně vytvořena");
      refetch();
      return;
    }

    const { error } = await updateCategory(token, {
      categoryId: category.id,
      ...data,
    });

    if (error) {
      toast.error("Kategorie se nepodařilo upravit");
      return;
    }

    if (imageFile) {
      await uploadImage(token, category.id, "categories", imageFile);
    }

    toast.success("Kategorie byla úspěšně upravena");
    refetch();
  };

  const handleRemove = async () => {
    if (!category) return;

    const { error } = await removeCategory(token, category.id);

    if (error) {
      toast.error("Kategorii se nepodařilo smazat");
      return;
    }
    handleClose();
    toast.success("Kategorie byla úspěšně smazána");
    refetch();
  };

  const handleClose = () => {
    handleBarOpen();
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageChange(e, setItemImage, setImageFile);
  };

  const edited =
    itemImage !== category?.image ||
    itemName !== category?.name ||
    itemDescription !== category?.description;

  const isEmpty = !itemName || !itemDescription;

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
          {category !== null ? (
            <Button
              className="m-auto border-red-400 bg-red-400 hover:bg-red-500"
              onClick={confirmDelete ? handleRemove : handleConfirmDelete}
            >
              {confirmDelete ? "Opravdu smazat?" : "Smazat"}
            </Button>
          ) : null}
          <Button
            className="m-auto"
            onClick={handleSave}
            disabled={!edited || isEmpty}
          >
            Uložit
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default MenuCategoryEditBar;
