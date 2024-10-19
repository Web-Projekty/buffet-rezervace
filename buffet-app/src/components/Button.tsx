import React from "react";

type Button = {
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
}: Button) => {
  return (
    <button
      className={`rounded-md border border-cyan-900 bg-cyan-500 p-2 text-white hover:bg-cyan-600 ${additionalStyles}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
