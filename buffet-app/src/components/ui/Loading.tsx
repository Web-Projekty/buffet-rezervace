import { bouncy } from "ldrs";
import { twMerge } from "tailwind-merge";

bouncy.register();

type LoadingProps = {
  size?: number;
  className?: string;
};

const Loading = ({ size = 30, className }: LoadingProps) => {
  return (
    <div className={twMerge("flex items-center justify-center", className)}>
      <l-bouncy size={size} speed="1.75" color="white" />
    </div>
  );
};

export default Loading;
