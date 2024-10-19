import { tailspin } from "ldrs";

tailspin.register();

const LoginLoading = () => {
  return (
    <div className="flex items-center justify-center">
      <l-tailspin size="30" stroke="5" speed="0.9" color="white" />
    </div>
  );
};

export default LoginLoading;
