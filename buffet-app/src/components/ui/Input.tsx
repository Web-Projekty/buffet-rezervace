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
  name?: string;
  label?: string;
  value?: string | number;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  labelClassName?: string;
  inputClassName?: string;
  placeholder?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  accept?: string;
  autoComplete?: "on" | "off";
  displayStar?: boolean;
  basic?: boolean;
};

const Input = ({
  type,
  id,
  label,
  name = "",
  value = "",
  required = false,
  onChange,
  className = "w-full rounded-lg p-1 text-black",
  inputClassName = "flex w-full flex-col md:flex-row md:items-center",
  labelClassName = "w-1/2 font-semibold text-white",
  placeholder,
  disabled,
  min = 0,
  max = Infinity,
  accept,
  autoComplete = "off",
  displayStar,
  basic,
}: InputProps) => {
  if (basic) {
    return (
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        required={required}
        onChange={onChange}
        className={"rounded-lg p-1 text-black " + className}
        placeholder={placeholder}
        autoComplete={autoComplete}
        disabled={disabled}
        min={min}
        max={max}
        accept={accept || (type === "file" ? "image/*" : undefined)}
      />
    );
  }
  if (label) {
    return (
      <div className={className}>
        <label htmlFor={id} className={labelClassName}>
          {label}
        </label>

        <input
          type={type}
          id={id}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          className={inputClassName}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          min={min}
          max={max}
          accept={accept || (type === "file" ? "image/*" : undefined)}
        />
      </div>
    );
  }

  if (required && displayStar) {
    return (
      <div className={"relative w-full " + className}>
        <span className="absolute right-1 text-xl text-red-500" title="Povinné">
          *
        </span>
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          required={required}
          onChange={onChange}
          className={"rounded-lg p-1 text-black" + inputClassName}
          placeholder={placeholder}
          autoComplete={autoComplete}
          disabled={disabled}
          min={min}
          max={max}
          accept={accept || (type === "file" ? "image/*" : undefined)}
        />
      </div>
    );
  }

  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      required={required}
      onChange={onChange}
      className={"rounded-lg p-1 text-black " + className}
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
