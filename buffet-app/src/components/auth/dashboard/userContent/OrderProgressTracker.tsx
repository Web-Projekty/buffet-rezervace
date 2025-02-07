type ProgressTrackerProps = {
  currentStep: number;
  isCancelled: boolean;
};

type Step = {
  label: string;
  icon: string;
  step: number;
};

const steps: Step[] = [
  { label: "Odesláno", icon: "📤", step: 0 },
  { label: "V přípravě", icon: "👨‍🍳", step: 1 },
  { label: "K vyzvednutí", icon: "🍔", step: 2 },
  { label: "Vyzvednuto", icon: "✔️", step: 3 },
];

const ProgressTracker = ({
  currentStep,
  isCancelled,
}: ProgressTrackerProps) => {
  return (
    <section className="flex w-full items-center justify-center">
      <div className="flex items-center gap-8 md:gap-28">
        {steps.map((step, index) => {
          const isCompleted: boolean =
            currentStep < 3
              ? step.step < currentStep
              : step.step <= currentStep;
          const isActive = step.step === currentStep;

          return (
            <div
              key={step.label}
              className="relative flex flex-row items-center justify-center"
            >
              <div className="relative flex w-full flex-col items-center justify-center gap-2">
                <div
                  className={`z-[2] flex h-14 w-14 items-center justify-center rounded-full ${
                    isCompleted
                      ? "bg-blue-500 text-white"
                      : isActive
                        ? "animate-wiggle border-2 border-blue-500 bg-blue-200 text-blue-500"
                        : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {isCompleted ? (isCancelled ? "❌" : "✔️") : step.icon}
                </div>

                <div
                  className={`absolute top-16 text-nowrap text-sm md:text-base ${
                    isCompleted || isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute left-0 mx-2 h-[2px] w-[8rem] bg-gray-400 md:w-[12rem]">
                  <div
                    className={`h-full ${
                      isCompleted
                        ? "bg-blue-500"
                        : isCancelled
                          ? "bg-red-400"
                          : "bg-gray-400"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ProgressTracker;
