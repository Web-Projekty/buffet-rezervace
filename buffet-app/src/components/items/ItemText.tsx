type ItemTextProps = {
  name: string;
  price: number;
  description: string;
};

const ItemText = ({ name, description }: ItemTextProps) => {
  return (
    <div className="flex flex-col justify-center gap-1">
      <div className="flex h-auto w-full flex-col items-start justify-between font-bold">
        <h1 className="w-full rounded-lg text-xl">{name}</h1>
      </div>
      <hr />
      <p className="rounded-lg px-2 text-descriptionColor">{description}</p>
    </div>
  );
};

export default ItemText;
