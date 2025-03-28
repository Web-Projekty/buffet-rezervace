import { twMerge } from "tailwind-merge";
import { MappedOrderItem } from "../../types";
import { formatCurrency, getVariantsPrice } from "../utils/utils";

type OrderItemProps = {
  item: MappedOrderItem;
  className?: string;
};

const OrderItem = ({ item, className }: OrderItemProps) => {
  const variants = item.selectedVariants
    ? item?.variants
        .map((variant) =>
          item?.selectedVariants.includes(variant.id) ? variant : null,
        )
        .filter((variant) => variant !== null)
    : [];

  return (
    <li
      className={twMerge(
        "flex w-full flex-row justify-between gap-2",
        className,
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <p className="text-descriptionColor">{item.quantity}x</p>
        <h3 className="flex flex-col">
          {item.name ? item.name : "Item name"}{" "}
          <span className="text-descriptionColor">
            {variants && variants.length > 0
              ? `(${variants.map((variant) => variant?.name).join(", ")})`
              : ""}
          </span>
        </h3>
      </div>
      <p className="italic">
        {item.price
          ? formatCurrency(
              item.price * item.quantity +
                getVariantsPrice(
                  item.selectedVariants,
                  item.variants,
                  item.quantity,
                ),
            )
          : formatCurrency(-1)}
      </p>
    </li>
  );
};

export default OrderItem;
