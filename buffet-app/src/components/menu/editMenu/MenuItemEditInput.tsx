import Input, { InputProps } from "../../ui/Input";

type MenuItemEditInputProps = {
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  type: InputProps["type"];
};

const MenuItemEditInput = ({
  label,
  value,
  onChange,
  id,
  type,
}: MenuItemEditInputProps) => {
  return (
    <div className="flex items-center justify-between gap-2">
      <label htmlFor={id}>{label}</label>
      <Input
        type={type}
        id={id}
        name={id}
        inputClassName="w-[18rem] rounded-md p-1 text-black"
        value={value}
        onChange={onChange}
        min={0}
        placeholder={label}
      />
    </div>
  );
};

export default MenuItemEditInput;
