import { useState } from "react";
import { Category, MenuItem, Variant } from "../../../types";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import MenuItemEditInput from "./MenuItemEditInput";
import { allergens } from "../../../allergens";
import ToggleSwitch from "../../ui/ToggleSwitch";
import { onImageChange } from "../../utils/utils";
import LazyImage from "../../ui/LazyImage";

type MenuItemEditBarProps = {
  handleBarOpen: () => void;
  menuItem: MenuItem | null;
  categories: Category[];
};

const MenuItemEditBar = ({
  handleBarOpen,
  menuItem,
  categories,
}: MenuItemEditBarProps) => {
  const [itemName, setItemName] = useState<string>(menuItem?.name || "");
  const [itemPrice, setItemPrice] = useState<number>(menuItem?.price || 0);
  const [itemDescription, setItemDescription] = useState<string>(
    menuItem?.description || "",
  );
  const [allergensInput, setAllergensInput] = useState<number[]>(
    menuItem?.allergens.map((allergen) => allergen.id) || [],
  );
  const [itemImage, setItemImage] = useState<string>(menuItem?.image || "");
  const [itemCategory, setItemCategory] = useState<Category["id"]>(
    menuItem?.category || 0,
  );
  const [itemVariants, setItemVariants] = useState<Variant[]>(
    menuItem?.variants || [],
  );
  const [cashPayment, setCashPayment] = useState<boolean>(false);
  const [cashVariants, setCashVariants] = useState<boolean>(false);

  const handleSave = () => {
    // Save item to backend
    handleClose();
  };

  const handleClose = () => {
    handleBarOpen();
  };

  const handleVariantChange = (
    index: number,
    field: keyof Variant,
    value: string,
  ) => {
    const newVariants = [...itemVariants];
    newVariants[index] = { ...newVariants[index], [field]: value };
    setItemVariants(newVariants);
  };

  const handleAddVariant = () => {
    setItemVariants([...itemVariants, { name: "", quantity: 0, price: 0 }]);
  };

  const handleRemoveVariant = (index: number) => {
    const newVariants = itemVariants.filter((_, i) => i !== index);
    setItemVariants(newVariants);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onImageChange(e, setItemImage);
  };

  const handleAllergenChange = (id: number) => {
    setAllergensInput((prev) =>
      prev.includes(id)
        ? prev.filter((allergenId) => allergenId !== id)
        : [...prev, id],
    );
  };

  return (
    <div className="sticky top-0 h-screen flex-shrink-0">
      <div className="sticky right-3 top-0 z-10 flex w-[28rem] flex-col gap-5 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black">
        <h1 className="text-center">Úprava itemu</h1>
        <div className="flex w-full flex-col gap-4">
          <label htmlFor="itemImage" className="m-auto w-48 cursor-pointer">
            {itemImage ? (
              <LazyImage image={itemImage} alt={itemName + "' image"} />
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
            id="itemName"
            type="text"
          />

          <textarea
            id="itemDescription"
            className="w-full rounded-md p-1 text-black"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Popis"
          />

          <MenuItemEditInput
            label="Cena"
            value={itemPrice}
            onChange={(e) => setItemPrice(Number(e.target.value))}
            id="itemPrice"
            type="number"
          />

          <div className="flex flex-row justify-between gap-2">
            <label htmlFor="category">Kategorie</label>
            <select
              id="category"
              className="w-[10rem] rounded-md border-none p-1 text-black"
              value={itemCategory}
              onChange={(e) => setItemCategory(Number(e.target.value))}
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <ToggleSwitch
              label="Povolit placení na pokladně"
              checked={cashPayment}
              onChange={() => setCashPayment((prev) => !prev)}
            />
            <ToggleSwitch
              label="Povolit placení na pokladně i pro varianty"
              checked={cashVariants}
              onChange={() => setCashVariants((prev) => !prev)}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label>Alergeny</label>
            <div className="grid grid-cols-3">
              {allergens.map((allergen) => (
                <label key={allergen.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={allergensInput.includes(allergen.id)}
                    onChange={() => handleAllergenChange(allergen.id)}
                  />
                  {allergen.name}
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label>Varianty</label>
            {itemVariants.map((variant, index) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  id={`variantName-${index}`}
                  name={`variantName-${index}`}
                  type="text"
                  inputClassName="rounded-md p-1 text-black"
                  value={variant.name}
                  onChange={(e) =>
                    handleVariantChange(index, "name", e.target.value)
                  }
                  placeholder="Variant Name"
                />
                <Input
                  id={`variantPrice-${index}`}
                  name={`variantPrice-${index}`}
                  type="number"
                  inputClassName="rounded-md p-1 text-black"
                  value={variant.price}
                  onChange={(e) =>
                    handleVariantChange(index, "price", e.target.value)
                  }
                  placeholder="Variant Price"
                  min={0}
                />
                <Button
                  className="px-3 py-1"
                  onClick={() => handleRemoveVariant(index)}
                >
                  X
                </Button>
              </div>
            ))}
            <Button className="w-32" onClick={handleAddVariant}>
              Přidat variantu
            </Button>
          </div>
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

export default MenuItemEditBar;
