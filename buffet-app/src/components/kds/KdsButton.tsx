import { ButtonProps } from "../Button";

const KdsButton = ({
  type,
  onClick,
  className,
  disabled,
  children,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`w-36 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-400 ${className}`}
    >
      {children}
    </button>
  );
};

export default KdsButton;
