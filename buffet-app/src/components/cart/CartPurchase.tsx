import useCart from "../../store/CartStore";
import Button from "../Button";
import { useUser } from "../../hooks/useUser";
import { useState } from "react";
import { formatCurrency } from "../utils/utils";
import CartReservationCalendar, {
  Day,
  Hour,
  Minute,
} from "./CartPurchaseCalendar";
import PageNotFound from "../error/PageNotFound";
import thePay from "../../assets/images/thePay.svg";
import kredity from "../../assets/images/kredity.svg";
import wallet from "../../assets/images/wallet.svg";
import creditCart from "../../assets/images/creditCard.svg";

type PaymentMethod = {
  name: string;
  input: "checkbox" | "radio";
  image: PaymentMethodImage[];
};

type PaymentMethodImage = {
  src: string;
  alt: string;
};

type SelectedTime = {
  day: Day;
  hour: Hour;
  minute: Minute;
};

const paymentMethods: PaymentMethod[] = [
  {
    name: "Předplacené kredity",
    input: "checkbox",
    image: [{ src: kredity, alt: "Předplacené kredity" }],
  },
  {
    name: "Platba kartou, Google Pay, Apple Pay a další",
    input: "radio",
    image: [{ src: thePay, alt: "The Pay (platební brána)" }],
  },
  {
    name: "Platba na pokladně",
    input: "radio",
    image: [
      { src: creditCart, alt: "Kreditní/debetní karta" },
      { src: wallet, alt: "Hotovost" },
    ],
  },
];

const CartPurchase = () => {
  const { token, fullName, email } = useUser();
  const { cartItems, isCartEmpty } = useCart();
  const [selectedPaymentMethods, setSelectedPaymentMethods] = useState<
    PaymentMethod[]
  >([]);
  const [selectedTime, setSelectedTime] = useState<SelectedTime | null>(null);

  const handleSubmit = async () => {
    if (!token) return;
    if (isCartEmpty()) return;
  };

  const selectedPaymentMethodsLengthWithoutCredits =
    selectedPaymentMethods.filter(
      (method) => method.input !== "checkbox",
    ).length;

  const handlePaymentMethodChange = (method: PaymentMethod) => {
    setSelectedPaymentMethods((prev) => {
      if (method.input === "radio") {
        const filtered = prev.filter((m) => m.input !== "radio");
        return [...filtered, method];
      }
      if (prev.includes(method)) {
        return prev.filter((m) => m !== method);
      }
      return [...prev, method];
    });
  };

  const handleSelectTime = (day: Day, hour: Hour, minute: Minute) => {
    setSelectedTime({ day, hour, minute });
  };

  const sortedSelectedPaymentMethods = selectedPaymentMethods.sort((a, b) => {
    if (a.name === "Předplacené kredity") return -1;
    if (b.name === "Předplacené kredity") return 1;
    return 0;
  });

  if (cartItems.length <= 0) return <PageNotFound />;

  return (
    <div className="m-auto grid w-[60%] grid-cols-2 gap-10 text-white">
      <div className="flex w-full flex-col gap-5">
        <CartReservationCalendar onTimeSelect={handleSelectTime} />

        <div className="flex flex-col rounded-lg bg-slate-700 p-3">
          <h2 className="text-2xl font-bold">Metoda platby</h2>
          <div className="flex flex-col gap-2 rounded-lg bg-backgroundColor p-3">
            {paymentMethods.map((method) => {
              return (
                <div
                  key={method.name}
                  className="flex flex-row items-center justify-between rounded-lg border border-white p-2"
                  onClick={() => handlePaymentMethodChange(method)}
                >
                  <div className="flex flex-row items-center justify-center gap-2">
                    {method.image.map((image) => (
                      <img
                        key={image.alt}
                        src={image.src}
                        alt={image.alt}
                        className="h-6 w-6"
                      />
                    ))}
                  </div>

                  <label
                    htmlFor={method.name}
                    className="mx-3 ml-auto text-base"
                  >
                    {method.name}
                  </label>
                  <input
                    type={method.input}
                    name={method.input === "radio" ? "payment" : undefined}
                    id={method.name}
                    checked={selectedPaymentMethods.includes(method)}
                    onChange={() => handlePaymentMethodChange(method)}
                    className="pointer-events-none"
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-slate-700 p-3">
          <h2 className="text-2xl font-bold">Kontaktní údaje</h2>
          <div className="flex flex-col gap-2 rounded-lg bg-backgroundColor p-3">
            {token ? (
              <>
                <div className="flex flex-col">
                  <h3 className="font-bold">Jméno a příjmení</h3>
                  <p className="ml-3 text-sm">{fullName}</p>
                </div>
                <div className="flex flex-col">
                  <h3 className="font-bold">Emailová adresa</h3>
                  <p className="ml-3 text-sm">{email}</p>
                </div>
              </>
            ) : (
              "Pro pokračování se prosím přihlaste"
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex flex-col rounded-lg bg-slate-700 p-3">
          <h2 className="text-2xl font-bold">Objednávka</h2>
          <div className="flex flex-col gap-2 rounded-lg p-5">
            {cartItems &&
              cartItems.map(({ name, variants, price, quantity }) => {
                return (
                  <div key={name} className="flex flex-col gap-1">
                    <div className="flex flex-row items-center justify-between">
                      <h3>
                        {name} <span>x {quantity}</span>
                      </h3>
                      <p className="italic">
                        {formatCurrency(quantity * price)}
                      </p>
                    </div>

                    <div>
                      {variants &&
                        variants.map((variant) => {
                          return (
                            <div className="flex flex-row items-center justify-between">
                              <p>{variant.name}</p>
                              <p className="italic">+{variant.price}</p>
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
            <hr />
            <div className="flex flex-row items-center justify-between font-bold">
              <h3>Celkem</h3>
              <p className="italic">
                {formatCurrency(
                  cartItems.reduce(
                    (acc, { price, quantity }) => acc + price * quantity,
                    0,
                  ),
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg bg-slate-700 p-3">
          <h2 className="text-2xl font-bold">Čas vyzvednutí</h2>{" "}
          <p>
            {selectedTime
              ? `${selectedTime.day.label} ${selectedTime.hour.label}:${selectedTime.minute.label}`
              : "Není vybrán žádný čas"}
          </p>
        </div>

        <div
          className={`flex flex-row ${sortedSelectedPaymentMethods.length > 1 ? "items-start" : "items-center"} justify-between rounded-lg bg-slate-700 p-3`}
        >
          <h2 className="text-2xl font-bold">Platba</h2>
          <div className="flex flex-col items-end rounded-lg">
            {sortedSelectedPaymentMethods.length > 0 ? (
              sortedSelectedPaymentMethods.map((method) => (
                <p key={method.name}>{method.name}</p>
              ))
            ) : (
              <p>Nebyla vybrána žádná metoda</p>
            )}
          </div>
        </div>
        <div className="flex flex-col rounded-lg bg-slate-700 p-3">
          <Button
            disabled={
              selectedPaymentMethodsLengthWithoutCredits < 1 ||
              !selectedTime ||
              isCartEmpty() ||
              !token
            }
            onClick={handleSubmit}
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
