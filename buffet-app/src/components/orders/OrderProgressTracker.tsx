type ProgressTrackerProps = {
  steps: Step[];
  currentStep: number;
};

export type Step = {
  label: string;
  icon: string;
  status: "active" | "completed" | "inactive";
};

const ProgressTracker = ({ steps }: ProgressTrackerProps) => {
  return (
    <div className="flex w-full items-center justify-center">
      <div className="flex items-center gap-28">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isActive = step.status === "active";

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
                  {isCompleted ? "✔️" : step.icon}
                </div>

                <div
                  className={`absolute top-16 text-nowrap text-base ${
                    isCompleted || isActive ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step.label}
                </div>
              </div>

              {index < steps.length - 1 && (
                <div className="absolute left-0 mx-2 h-[2px] w-[12rem] bg-gray-400">
                  <div
                    className={`h-full ${
                      isCompleted ? "bg-blue-500" : "bg-gray-400"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressTracker;
