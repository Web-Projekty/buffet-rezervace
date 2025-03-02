import { bouncy } from "ldrs";

bouncy.register();

type LoadingProps = {
  size?: number;
};

const Loading = ({ size = 30 }: LoadingProps) => {
  return (
    <div className="flex items-center justify-center">
      <l-bouncy size={size} speed="1.75" color="white" />
    </div>
  );
};

export default Loading;
