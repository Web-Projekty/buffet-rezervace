import { Order } from "../../types";
import ProgressTracker, { Step } from "./OrderProgressTracker";

const steps: Step[] = [
  { label: "Odesláno", icon: "📤", status: "completed" },
  { label: "V přípravě", icon: "👨‍🍳", status: "active" },
  { label: "K vyzvednutí", icon: "🍔", status: "inactive" },
  { label: "Vyzvednuto", icon: "✔️", status: "inactive" },
];

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
    default:
      return "Neznámý stav objednávky.";
  }
};

const OrderTracking = () => {
  const order: Order | null = null;
  const currentStep = steps.findIndex((step) => step.status === "active");

  //   if (!order) {
  //     return (
  //       <div className="flex w-full flex-col items-center justify-center gap-16 rounded-lg p-6 text-white">
  //         <h1>Nemáte aktivní žádnou objednávku.</h1>
  //       </div>
  //     );
  //   }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-16 rounded-lg p-6 text-white">
      <div className="flex flex-col gap-5">
        <h1 className="text-lg font-semibold">Aktuální objednávka</h1>
        <ProgressTracker steps={steps} currentStep={currentStep} />
      </div>

      <p>{getTextBySteps(currentStep)}</p>

      <div className="flex flex-row gap-5">
        <h2>Obsah</h2>
        <div>
          <p>Vaše objednávka bude k vyzvednutí pod číslem</p>
          <h3>#384</h3>
          <p>(10:15 - 10:20)</p>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
