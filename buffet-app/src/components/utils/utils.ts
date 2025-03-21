import toast from "react-hot-toast";
import { MappedOrderItem, OrderItem, OrderItems, Variant } from "../../types";
import { CartItem } from "../../store/CartStore";

export const formatCurrency = (number: number): string => {
  return new Intl.NumberFormat("cs-CZ", {
    style: "currency",
    currency: "CZK",
  }).format(number / 100);
};

export const removeDiacritics = (text: string | undefined): string => {
  if (!text) return "";
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};

export const extractToken = (header: string | null): string => {
  return header ? header.split(" ")[1] : "";
};

export const formatDate = (
  date: string,
  options?: Intl.DateTimeFormatOptions,
): string => {
  const dateObject = new Date(date);
  return dateObject.toLocaleDateString("cs-CZ", options);
};

export const parseSelectedTime = (selectedTime: string | null) => {
  if (!selectedTime) return { startTime: "", endTime: "", formattedDate: "" };

  const monthMap: { [key: string]: number } = {
    ledna: 1,
    února: 2,
    března: 3,
    dubna: 4,
    května: 5,
    června: 6,
    července: 7,
    srpna: 8,
    září: 9,
    října: 10,
    listopadu: 11,
    prosince: 12,
  };

  const parts = selectedTime.split(" ");
  const day = parts[1].split(".")[0].padStart(2, "0");
  const month = monthMap[parts[2].toLowerCase()];
  const year = new Date().getFullYear();

  const formattedDate = `${year}-${month}-${day}`;

  const [startTime, endTime] = parts[3].split("-");

  //console.log(formattedDate);

  return { startTime, endTime, formattedDate };
};

export const mapItemsWithOrders = (
  orderItems: OrderItems[],
  items: OrderItem[],
  variants: Variant[],
): MappedOrderItem[] => {
  try {
    if (!orderItems || !items) return [];
    return orderItems.map((orderItem) => {
      const item = items.find((i) => i.id === orderItem.id);

      return {
        ...orderItem,
        name: item?.name ?? "Neznámá položka",
        price: item?.price,
        description: item?.description,
        image: item?.image,
        allergens: item?.allergens ?? [],
        category: item?.category ?? 0,
        variants: variants ?? [],
        quantity: orderItem.quantity ?? 0,
        selectedVariants: variants
          .filter((variant) => variant.itemId === orderItem.id)
          .map((variant) => variant.id),
      };
    });
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getVariantsPrice = (
  selectedVariants: CartItem["selectedVariants"],
  variants: Variant[],
  quantity: CartItem["quantity"],
) => {
  if (!Array.isArray(selectedVariants) || !Array.isArray(variants)) return 0;
  //console.log(selectedVariants, variants);
  const filteredVariants = variants
    .map((variant) => (selectedVariants.includes(variant.id) ? variant : null))
    .filter((variant) => variant !== null);

  return (
    filteredVariants
      .map((variant) => variant?.addedPrice)
      .reduce((acc, price) => acc + price, 0) * quantity
  );
};

export const onImageChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: (image: string) => void,
) => {
  if (e.target.files && e.target.files[0]) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setImage(event.target?.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  }
};

export const formatUnixDate = (date: string): string => {
  const dateObject = new Date(parseInt(date));
  return dateObject.toLocaleDateString("cs-CZ");
};

export const formatToUnixDate = (date: string): string => {
  const dateObject = new Date(date);
  return Math.floor(dateObject.getTime() / 1000).toString();
};

export const matchValues = (text: string, text2: string): boolean => {
  return text === text2;
};

export const checkPassword = (password: string): boolean => {
  const isValid =
    password.length >= 8 &&
    !!password.match(/[a-z]/) &&
    !!password.match(/[A-Z]/) &&
    !!password.match(/[0-9]/);

  return isValid;
};

export const handleResponse = (
  status: "success" | "failed",
  successMessage: string,
  errorMessage: string,
) => {
  if (status === "failed") {
    toast.error(errorMessage);
  } else if (status === "success") {
    toast.success(successMessage);
  }

  return { success: successMessage };
};
