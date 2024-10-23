import { tailspin } from "ldrs";

tailspin.register();

type Loading = {
  size?: number;
};

const Loading = ({ size = 30 }: Loading) => {
  return (
    <div className="flex items-center justify-center">
      <l-tailspin size={size} stroke="5" speed="0.9" color="white" />
    </div>
  );
};

export default Loading;
