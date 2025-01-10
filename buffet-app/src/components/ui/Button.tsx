import Loading from "./Loading";

export type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  loading?: boolean;
};

const Button = ({
  type,
  onClick,
  className,
  disabled,
  children,
  loading,
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md border border-cyan-900 bg-cyan-500 p-2 text-white hover:bg-cyan-600 ${className} ${disabled ? "cursor-not-allowed bg-cyan-600" : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <Loading size={20} /> : children}
    </button>
  );
};

export default Button;
