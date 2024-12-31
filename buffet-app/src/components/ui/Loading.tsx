import { tailspin } from "ldrs";

tailspin.register();

type LoadingProps = {
  size?: number;
};

const Loading = ({ size = 30 }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center">
      <l-tailspin size={size} stroke="5" speed="0.9" color="white" />
    </div>
  );
};

export default Loading;
