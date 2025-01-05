import { useMemo } from "react";
import { Order } from "../../types";
import ProgressTracker from "./OrderProgressTracker";
import useOrders from "../../hooks/useOrders";
import Loading from "../ui/Loading";

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
  const { latestOrder, isLoading, error } = useOrders();

  const currentStep: number = useMemo(
    () => (latestOrder ? getCurrentStep(latestOrder) : -2),
    [latestOrder],
  );

  if (isLoading) {
    return <Loading size={30} />;
  }

  if (error) {
    return <div className="text-white">{error}</div>;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-16 rounded-lg p-6 text-white">
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-semibold">Aktuální objednávka</h1>
        <ProgressTracker currentStep={currentStep} />
      </div>

      <p className="text-center">{getTextBySteps(currentStep)}</p>

      {latestOrder ? (
        <div className="flex flex-row gap-5">
          <h2>Obsah</h2>
          <div>
            <p>Vaše objednávka bude k vyzvednutí pod číslem</p>
            <h3>{latestOrder.pickUpId}</h3>
            <p>{latestOrder.pickupDate}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OrderTracking;
