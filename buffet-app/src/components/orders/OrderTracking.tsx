import { useMemo } from "react";
import { Order } from "../../types";
import ProgressTracker from "./OrderProgressTracker";

const getTextBySteps = (step: number) => {
  switch (step) {
    case 0:
      return "Vaše objednávka byla vytvořena, vyčkejte na její přípravu a následné vyzvednutí.";
    case 1:
      return "Vaše objednávka se již připravuje, připravte se k jejímu vyzvednutí";
    case 2:
      return "Vaše objednávka je připravena k vyzvednutí.";
    case 3:
      return "Vaše objednávka byla úspěšně vyzvednuta.";
    case 4:
      return "Objednávka byla zrušena vámi či provozovatelem.";
    case -1:
      return "Žádná objednávka nebyla dosud vytvořena.";
    default:
      return "Neznámý stav objednávky.";
  }
};

const getCurrentStep = (order: Order | null): number => {
  if (order === null) return -1;
  if (order.status === "sent") return 0;
  if (order.status === "preparing") return 1;
  if (order.status === "waiting") return 2;
  if (order.status === "done") return 3;
  if (order.status === "cancelled" || order.status === "storno") return 4;
  return -1;
};

const OrderTracking = () => {
  const order: Order | null = useMemo(
    () => ({
      id: 1,
      userId: 1,
      status: "preparing",
      date: Date.now().toLocaleString(),
      pickupDate:
        new Date(Date.now() + 1000).toLocaleTimeString() +
        " - " +
        new Date(Date.now() + 301000).toLocaleTimeString(),
      items: [],
      pickUpId: "#264",
    }),
    [],
  );
  const currentStep: number = useMemo(
    () => (order ? getCurrentStep(order) : -2),
    [order],
  );

  return (
    <div className="flex w-full flex-col items-center justify-center gap-16 rounded-lg p-6 text-white">
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-semibold">Aktuální objednávka</h1>
        <ProgressTracker currentStep={currentStep} />
      </div>

      <p className="text-center">{getTextBySteps(currentStep)}</p>

      {order ? (
        <div className="flex flex-row gap-5">
          <h2>Obsah</h2>
          <div>
            <p>Vaše objednávka bude k vyzvednutí pod číslem</p>
            <h3>{order.pickUpId}</h3>
            <p>{order.pickupDate}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderTracking;
