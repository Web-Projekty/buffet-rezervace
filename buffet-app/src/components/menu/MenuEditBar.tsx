import { useState } from "react";
import { Allergen, MenuItem, Variant } from "../../types";
import Input from "../Input";
import Button from "../Button";

type MenuEditBarProps = {
  handleBarOpen: () => void;
  menuItem: MenuItem;
};

const MenuEditBar = ({ handleBarOpen, menuItem }: MenuEditBarProps) => {
  const [itemName, setItemName] = useState<string>(menuItem?.name);
  const [itemPrice, setItemPrice] = useState<number>(menuItem?.price);
  const [itemDescription, setItemDescription] = useState<string>(
    menuItem?.description,
  );
  const [itemImage, setItemImage] = useState<string>(menuItem?.image);
  const [itemAllergens, setItemAllergens] = useState<Allergen[]>(
    menuItem?.allergens,
  );
  const [itemCategory, setItemCategory] = useState<MenuItem["category"]>(
    menuItem?.category,
  );
  const [itemVariants, setItemVariants] = useState<Variant[]>(
    menuItem?.variants || [],
  );

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
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setItemImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="fixed right-3 z-10 flex h-[38rem] w-[35%] flex-col gap-5 rounded-lg bg-slate-900 p-4 text-white shadow-md shadow-black">
      <h1 className="text-center">Úprava itemu</h1>
      <div className="flex w-full flex-col gap-2">
        <label htmlFor="itemImage" className="m-auto w-48 cursor-pointer">
          {itemImage ? (
            <img
              src={itemImage}
              alt="Item"
              className="h-32 w-32 object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center border-2 border-gray-400">
              <span>Upload Image</span>
            </div>
          )}
          <input
            id="itemImage"
            name="itemImage"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <div className="flex items-center gap-2">
          <label htmlFor="itemName">Název</label>
          <input
            type="text"
            id="itemName"
            className="rounded-md p-1 text-black"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="itemPrice">Cena</label>
          <input
            type="number"
            id="itemPrice"
            className="rounded-md p-1 text-black"
            value={itemPrice}
            onChange={(e) => setItemPrice(parseInt(e.target.value))}
            min={0}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <label htmlFor="itemDescription">Popis</label>
          <textarea
            id="itemDescription"
            className="w-full rounded-md p-1 text-black"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label>Varianty</label>
          {itemVariants.map((variant, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                id={`variantName-${index}`}
                name={`variantName-${index}`}
                type="text"
                className="rounded-md p-1 text-black"
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
                className="rounded-md p-1 text-black"
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
            Add Variant
          </Button>
        </div>
      </div>
      <button onClick={handleBarOpen}>Close</button>
    </div>
  );
};

export default MenuEditBar;
