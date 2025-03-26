import { useState } from "react";
import { Allergen, Category, MenuItem, Variant } from "../../../types";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import MenuItemEditInput from "./MenuItemEditInput";
import { allergens } from "../../../allergens";
import ToggleSwitch from "../../ui/ToggleSwitch";
import { onImageChange } from "../../utils/utils";
import { motion } from "framer-motion";
import { slideInAnimation } from "../../../animations";
import {
  createMenuItem,
  createVariant,
  removeMenuItem,
  updateMenuItem,
} from "../../utils/api";
import { useUser } from "../../../hooks/useUser";
import ImageInput from "../../ui/ImageInput";

type MenuItemEditBarProps = {
  handleBarOpen: () => void;
  menuItem: MenuItem | null;
  categories: Category[];
  refetch: () => void;
};

const MenuItemEditBar = ({
  handleBarOpen,
  menuItem,
  categories,
  refetch,
}: MenuItemEditBarProps) => {
  const { token } = useUser();

  const [itemName, setItemName] = useState<MenuItem["name"]>(
    menuItem?.name || "",
  );
  const [itemPrice, setItemPrice] = useState<string>(
    String(menuItem?.price ? menuItem.price / 100 : 0) || "0",
  );
  const [itemDescription, setItemDescription] = useState<
    MenuItem["description"]
  >(menuItem?.description || "");
  const [allergensInput, setAllergensInput] = useState<Allergen["id"][]>(
    menuItem?.allergens.map((allergen) => allergen.id) || [],
  );
  const [itemImage, setItemImage] = useState<MenuItem["image"]>(
    menuItem?.image || "",
  );
  const [itemCategory, setItemCategory] = useState<MenuItem["category"]>(
    menuItem?.category || 1,
  );
  const [itemVariants, setItemVariants] = useState<Variant[]>(
    menuItem?.variants.map((variant) => {
      return {
        ...variant,
        addedPrice: variant.addedPrice / 100,
      };
    }) || [],
  );
  const [cashPayment, setCashPayment] = useState<boolean>(false);
  const [cashVariants, setCashVariants] = useState<boolean>(false);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const handleSave = async () => {
    handleClose();
    const formatPrice = (Number(itemPrice.replace(",", ".")) * 100).toFixed(0);

    const data = {
      name: itemName,
      price: Number(formatPrice),
      description: itemDescription,
      image: itemImage,
      category: itemCategory,
      allergens: allergensInput,
      variants: itemVariants.map((variant) => ({
        ...variant,
        addedPrice: Number(
          (Number(String(variant.addedPrice).replace(",", ".")) * 100).toFixed(
            0,
          ),
        ),
        isExclusive: Boolean(variant.isExclusive),
      })),
    };

    if (!menuItem) {
      const { error } = await createMenuItem(token, {
        ...data,
      });

      // This inefficient loop is due to backend not supporting multiple variant creation at once
      // Tento neefektivní loop je zde kvůli backendu, který neumí vytvořit více variant najednou
      /*data.variants.forEach(async (variant) => {
        const { error } = await createVariant(token, menuItem?.id, {
          ...variant,
        });
      });*/

      if (error) {
        console.log("Error creating item");
      }
      refetch();
      return;
    }

    console.log("updating item");

    const { error } = await updateMenuItem(token, {
      itemId: menuItem.id,
      ...data,
    });

    if (error) {
      console.log("Error updating item");
    }
    refetch();
  };

  const handleRemove = async () => {
    if (!menuItem) return;
    handleClose();

    const { error } = await removeMenuItem(token, menuItem.id);

    if (error) {
      console.log("Error deleting item");
    }
    refetch();
  };

  const handleClose = () => {
    handleBarOpen();
  };

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  const handleVariantChange = (
    variantId: number,
    field: keyof Variant,
    value: string,
  ) => {
    console.log(variantId, field, value);
    setItemVariants((prev) =>
      prev.map((variant) =>
        variant.id === variantId ? { ...variant, [field]: value } : variant,
      ),
    );
  };

  const handleVariantExlusiveChange = (variantId: number, value: boolean) => {
    setItemVariants((prev) =>
      prev.map((variant) =>
        variant.id === variantId ? { ...variant, isExclusive: value } : variant,
      ),
    );
  };

  const handleAddVariant = () => {
    setItemVariants([
      ...itemVariants,
      {
        name: "",
        addedPrice: 0,
        isExclusive: false,
        id: itemVariants.length,
        itemId: menuItem?.id || 0,
      },
    ]);
  };

  const handleRemoveVariant = (index: number) => {
    const newVariants = itemVariants.filter((variant) => variant.id !== index);
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

  const edited =
    itemName !== menuItem?.name ||
    itemPrice !== String(menuItem?.price ? menuItem.price / 100 : 0) ||
    itemDescription !== menuItem?.description ||
    itemCategory !== menuItem?.category ||
    itemImage !== menuItem?.image ||
    JSON.stringify(allergensInput).match(JSON.stringify(menuItem?.allergens)) ||
    JSON.stringify(itemVariants).match(JSON.stringify(menuItem?.variants));

  const isEmpty =
    !itemImage ||
    !itemName ||
    !itemDescription ||
    !itemPrice ||
    itemCategory === null ||
    itemCategory === undefined;

  return (
    <motion.aside
      {...slideInAnimation(0.2)}
      className="sticky top-0 h-screen flex-shrink-0"
    >
      <div className="sticky right-3 top-0 z-10 flex w-[28rem] flex-col gap-5 rounded-lg bg-slate-900 p-4 text-white shadow-sm shadow-black">
        <h1 className="text-center text-xl font-bold">Úprava itemu</h1>
        <div className="relative flex w-full flex-col gap-4">
          <ImageInput
            itemImage={itemImage}
            itemName={itemName}
            handleImageChange={handleImageChange}
          />

          <MenuItemEditInput
            label="Název"
            value={itemName}
            onChange={(e) => {
              setItemName(e.target.value);
            }}
            id="itemName"
            type="text"
          />

          <textarea
            id="itemDescription"
            className="max-h-[3.5rem] min-h-[2rem] w-full rounded-md p-1 text-black focus:outline-none"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Popis"
          />

          <MenuItemEditInput
            label="Cena"
            value={itemPrice}
            onChange={(e) => setItemPrice(e.target.value)}
            id="itemPrice"
            type="string"
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
            <h2>Alergeny</h2>
            <div className="grid grid-cols-3">
              {allergens.map((allergen) => (
                <div key={allergen.id} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id={allergen.name}
                    checked={allergensInput.includes(allergen.id)}
                    onChange={() => handleAllergenChange(allergen.id)}
                  />
                  <label htmlFor={allergen.name}>{allergen.name}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h2>Varianty</h2>
            {itemVariants.map((variant) => (
              <div key={variant.id} className="flex items-center gap-2">
                <Input
                  id={`variantName-${variant}`}
                  name={`variantName-${variant}`}
                  type="text"
                  inputClassName="rounded-md p-1 text-black"
                  value={variant.name}
                  onChange={(e) =>
                    handleVariantChange(variant.id, "name", e.target.value)
                  }
                  placeholder="Název varianty"
                />
                <Input
                  id={`variantPrice-${variant}`}
                  name={`variantPrice-${variant}`}
                  type="text"
                  inputClassName="rounded-md p-1 text-black w-40"
                  value={variant.addedPrice}
                  onChange={(e) =>
                    handleVariantChange(
                      variant.id,
                      "addedPrice",
                      e.target.value,
                    )
                  }
                  placeholder="Cena varianty"
                  min={0}
                />

                <select
                  className="h-10 rounded-md p-1 text-black"
                  name="isExclusive"
                  value={variant.isExclusive ? 1 : 0}
                  onChange={(e) =>
                    handleVariantExlusiveChange(
                      variant.id,
                      Boolean(Number(e.target.value)),
                    )
                  }
                >
                  <option value={0}>Neexkluzivní</option>
                  <option value={1}>Exkluzivní</option>
                </select>

                <Button
                  className="px-3 py-1"
                  onClick={() => handleRemoveVariant(variant.id)}
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
          <Button
            className="m-auto border-red-400 bg-red-400 hover:bg-red-500"
            onClick={confirmDelete ? handleRemove : handleConfirmDelete}
          >
            {confirmDelete ? "Opravdu smazat?" : "Smazat"}
          </Button>
          <Button className="m-auto" onClick={handleSave}>
            Uložit
          </Button>
        </div>
      </div>
    </motion.aside>
  );
};

export default MenuItemEditBar;
