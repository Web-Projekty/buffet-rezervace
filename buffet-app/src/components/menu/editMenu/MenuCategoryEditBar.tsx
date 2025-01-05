import { useState } from "react";
import { Category } from "../../../types";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import MenuItemEditInput from "./MenuItemEditInput";
import { onImageChange } from "../../utils/utils";

type MenuCategoryEditBarProps = {
  handleBarOpen: () => void;
  category: Category | null;
};

const MenuCategoryEditBar = ({
  handleBarOpen,
  category,
}: MenuCategoryEditBarProps) => {
  const [itemImage, setItemImage] = useState<string>(category?.image || "");
  const [itemName, setItemName] = useState<string>(category?.name || "");
  const [itemDescription, setItemDescription] = useState<string>(
    category?.description || "",
  );

  const handleSave = () => {
    handleClose();
  };

  const handleClose = () => {
    handleBarOpen();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageChange(e, setItemImage);
  };

  return (
    <div className="sticky top-0 h-screen flex-shrink-0">
      <div className="sticky right-3 top-0 z-10 flex w-[28rem] flex-col gap-5 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black">
        <h1 className="text-center">Úprava kategorie</h1>
        <div className="flex w-full flex-col gap-4">
          <label htmlFor="itemImage" className="m-auto w-48 cursor-pointer">
            {itemImage ? (
              <img
                src={itemImage}
                alt="Item"
                className="h-[12rem] w-[16rem] rounded-lg object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center border-2 border-gray-400">
                <span>Upload Image</span>
              </div>
            )}

            <Input
              type="file"
              id="itemImage"
              name="itemImage"
              onChange={handleImageChange}
              inputClassName="hidden"
              accept="image/*"
            />
          </label>

          <MenuItemEditInput
            label="Název"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            id="categoryName"
            type="text"
          />

          <textarea
            id="categoryDescription"
            className="w-full rounded-md p-1 text-black"
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
    </div>
  );
};

export default MenuCategoryEditBar;
