import React from "react";
import Loading from "./Loading";
import { twMerge } from "tailwind-merge";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
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
      className={twMerge(
        `rounded-md border border-cyan-900 bg-interactiveColor p-2 text-white hover:bg-interactiveHoverColor ${disabled ? "cursor-not-allowed bg-cyan-600" : ""}`,
        className,
      )}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {loading ? <Loading size={20} /> : children}
    </button>
  );
};

export default Button;
