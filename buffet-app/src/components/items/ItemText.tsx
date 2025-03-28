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
      <p className="line-clamp-2 overflow-hidden text-ellipsis rounded-lg px-2 text-base font-normal text-descriptionColor">
        {description}
      </p>
    </div>
  );
};

export default ItemText;
