import { lazy, Suspense, useMemo } from "react";
import { Order } from "../../../../types";
import useOrders from "../../../../hooks/useOrders";
import Loading from "../../../ui/Loading";
import { Fallback } from "../../../../main";
import OrderItems from "../../../orders/OrderItems";
import { mapItemsWithOrders } from "../../../utils/utils";

const ProgressTracker = lazy(() => import("./OrderProgressTracker"));

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
  const { latestOrder, isLoading, error, fetchedItems } = useOrders(1, 1);

  const currentStep: number = useMemo(
    () => (latestOrder ? getCurrentStep(latestOrder) : -1),
    [latestOrder],
  );

  const isCancelled = latestOrder
    ? latestOrder.status === "cancelled" || latestOrder.status === "storno"
    : false;

  const dateText = useMemo(() => {
    if (!latestOrder) {
      return "Chyba";
    }

    const date = new Date(latestOrder.pickupDate);
    const startTime = latestOrder.startTime.substring(1, 5);
    const endTime = latestOrder.endTime.substring(1, 5);

    return `${startTime} - ${endTime} ${date.toLocaleDateString()}`;
  }, [latestOrder]);

  const mappedItems = mapItemsWithOrders(latestOrder?.items, fetchedItems);

  return (
    <section className="flex h-full w-full flex-col gap-2 rounded-lg text-white">
      <h1 className="text-2xl font-bold">Aktuální objednávka</h1>
      {!isLoading ? (
        error ? (
          <div className="text-white">{error}</div>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-16 rounded-lg bg-backgroundColor p-6">
            <>
              <Suspense fallback={<Fallback />}>
                <ProgressTracker
                  currentStep={currentStep}
                  isCancelled={isCancelled}
                />
              </Suspense>
              <div className="flex flex-col items-center gap-3">
                <p className="text-center">{getTextBySteps(currentStep)}</p>

                {latestOrder && !isCancelled ? (
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col items-center gap-2">
                      <p className="text-center">
                        Vaše objednávka bude k vyzvednutí pod číslem
                      </p>
                      <h3 className="text-2xl font-bold">
                        {latestOrder.pickUpId}
                      </h3>
                      <p>{dateText}</p>
                    </div>
                    <OrderItems mappedItems={mappedItems} />
                  </div>
                ) : null}
              </div>
            </>
          </div>
        )
      ) : (
        <Loading size={30} />
      )}
    </section>
  );
};

export default OrderTracking;
