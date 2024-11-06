type ButtonProps = {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  additionalStyles?: string;
  disabled?: boolean;
  children: React.ReactNode;
};

const Button = ({
  type,
  onClick,
  additionalStyles,
  disabled,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`rounded-md border border-cyan-900 bg-cyan-500 p-2 text-white hover:bg-cyan-600 ${additionalStyles} ${disabled ? "cursor-not-allowed bg-cyan-600" : ""}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
