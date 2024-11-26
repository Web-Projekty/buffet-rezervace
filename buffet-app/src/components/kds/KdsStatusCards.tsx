type KdsStatusCardsProps = {
  amount: number;
  title: string;
  backgroundColor?: string;
};

const KdsStatusCards = ({
  amount,
  title,
  backgroundColor = "white",
}: KdsStatusCardsProps) => {
  return (
    <div
      className={`flex flex-row items-center gap-5 ${backgroundColor} px-5 py-3 text-white`}
    >
      <span className="text-2xl font-bold">{amount}</span>
      <h2 className="text-xl">{title}</h2>
    </div>
  );
};

export default KdsStatusCards;
