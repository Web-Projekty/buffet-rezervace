import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import useCart from "../../../store/CartStore";
import Button from "../../ui/Button";
import { Fallback } from "../../../main";
import { useUser } from "../../../hooks/useUser";
import { Date as DateType, Hour, Minute, PaymentMethod } from "../../../types";
import { createOrder } from "../../utils/api";
import { parseSelectedTime } from "../../utils/utils";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { toastMessages } from "../../utils/toastMessages";

const CartReservationCalendar = lazy(() => import("./CartReservationCalendar"));
const CartPurchaseMethods = lazy(() => import("./CartPurchaseMethods"));
const OrderItems = lazy(() => import("../../orders/OrderItems"));
const CartUserInformation = lazy(() => import("./CartUserInformation"));
const CartPurchaseSelectedMethods = lazy(
  () => import("./CartPurchaseSelectedMethods"),
);
const PageNotFound = lazy(() => import("../../error/PageNotFound"));

const CartPurchase = () => {
  const { token, isAdmin } = useUser();
  const { cartItems, isCartEmpty, clearCart } = useCart();
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    PaymentMethod[]
  >([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  const navigate = useNavigate();

  const selectedPaymentMethodsLengthWithoutCredits = useMemo(
    () =>
      selectedPaymentMethods.filter((method) => method.input !== "checkbox")
        .length,
    [selectedPaymentMethods],
  );

  const isDisabled: boolean = useMemo(
    () =>
      selectedPaymentMethodsLengthWithoutCredits < 1 ||
      !selectedTime ||
      isCartEmpty() ||
      !token,
    [
      selectedPaymentMethodsLengthWithoutCredits,
      selectedTime,
      isCartEmpty,
      token,
    ],
  );

  const handleSubmit = useCallback(async () => {
    if (isDisabled) {
      toast.error(toastMessages.order.fillForm);
      return;
    }
    if (isSubmitting) return;
    if (success) return;

    setIsSubmitting(true);

    try {
      //console.log(selectedTime);
      const { startTime, endTime, formattedDate } =
        parseSelectedTime(selectedTime);

      const { order, error, paywallUrl } = await createOrder(
        token,
        cartItems.map(({ id, quantity }) => ({
          id,
          quantity,
          variants: [],
        })),
        startTime,
        endTime,
        formattedDate,
      );

      if (error) {
        toast.error(toastMessages.order.error);
      } else {
        setSuccess(true);
        toast.success(toastMessages.order.success);
        clearCart();
        if (paywallUrl) {
          window.location.href = paywallUrl;
        } else {
          navigate(`/success-order/${order?.id}`, {
            replace: true,
            state: { order },
          });
        }
      }
    } catch {
      toast.error(toastMessages.order.error);
    } finally {
      setIsSubmitting(false);
    }
  }, [isDisabled, selectedTime, token, cartItems, selectedPaymentMethods]);

  const handleSelectTime = useCallback(
    (day: DateType, hour: Hour, minute: Minute) => {
      const selectedTime =
        day.date +
        " " +
        hour.label.substring(0, 2) +
        minute.label.substring(0, 3) +
        "-" +
        hour.label.substring(0, 2) +
        minute.label.substring(6, 9);
      setSelectedTime(selectedTime);
    },
    [],
  );

  if (isAdmin) {
    return (
      <Suspense fallback={<Fallback />}>
        <PageNotFound />
      </Suspense>
    );
  }

  return (
    <div className="m-auto grid max-w-[25rem] grid-cols-1 gap-10 text-white transition-all duration-1000 ease-in-out md:max-w-[65rem] md:grid-cols-2">
      <div className="flex w-full flex-col gap-5">
        <div className="flex flex-col rounded-lg bg-slate-700 p-6 font-sans">
          <h2 className="text-2xl font-bold">Čas vyzvednutí</h2>
          <Suspense fallback={<Fallback />}>
            <CartReservationCalendar onTimeSelect={handleSelectTime} />
          </Suspense>
        </div>

        <div className="flex flex-col rounded-lg bg-slate-700 p-3">
          <h2 className="text-2xl font-bold">Metoda platby</h2>
          <Suspense fallback={<Fallback />}>
            <CartPurchaseMethods
              setSelectedPaymentMethods={setSelectedPaymentMethods}
              selectedPaymentMethods={selectedPaymentMethods}
            />
          </Suspense>
        </div>
        <div className="flex flex-col rounded-lg bg-slate-700 p-3">
          <h2 className="text-2xl font-bold">Kontaktní údaje</h2>
          <Suspense fallback={<Fallback />}>
            <CartUserInformation />
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col rounded-lg bg-slate-700 p-3">
          <h2 className="text-2xl font-bold">Objednávka</h2>
          <Suspense fallback={<Fallback />}>
            <OrderItems mappedItems={cartItems} />
          </Suspense>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg bg-slate-700 p-3">
          <h2 className="text-2xl font-bold">Čas vyzvednutí</h2>{" "}
          <p>{selectedTime ? selectedTime : "Nebyl vybrán žádný čas"}</p>
        </div>

        <div className="flex flex-row items-start justify-between rounded-lg bg-slate-700 p-3">
          <h2 className="text-2xl font-bold">Platba</h2>
          <Suspense fallback={<Fallback />}>
            <CartPurchaseSelectedMethods
              selectedPaymentMethods={selectedPaymentMethods}
            />
          </Suspense>
        </div>
        <div className="flex flex-col rounded-lg bg-slate-700 p-3">
          <Button
            disabled={isSubmitting || success}
            onClick={handleSubmit}
            loading={isSubmitting}
            className={`${isDisabled ? "cursor-not-allowed hover:bg-interactiveColor" : ""}`}
          >
            Potvrdit objednávku
          </Button>
          <p className="text-center text-xs text-descriptionColor">
            Potvrzením objednávky uživatel souhlasí se všeobecnými obchodními
            podmínkami a zavazuje se k platbě.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CartPurchase;
