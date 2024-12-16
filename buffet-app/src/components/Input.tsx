export type InputProps = {
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
  id: string;
  name: string;
  value?: string | number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  accept?: string;
  autoComplete?: "on" | "off";
};

const Input = ({
  type,
  id,
  name = "",
  value = "",
  required = false,
  onChange,
  className,
  placeholder,
  disabled,
  min = 0,
  max = Infinity,
  accept,
  autoComplete = "off",
}: InputProps) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
      autoComplete={autoComplete}
      disabled={disabled}
      min={min}
      max={max}
      accept={accept || (type === "file" ? "image/*" : undefined)}
    />
  );
};

export default Input;
