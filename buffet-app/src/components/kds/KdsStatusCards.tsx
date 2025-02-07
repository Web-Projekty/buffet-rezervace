type KdsStatusCardsProps = {
  amount: number | undefined;
  title: string;
  backgroundColor?: string;
};

const KdsStatusCards = ({
  amount,
  title,
  backgroundColor = "white",
}: KdsStatusCardsProps) => {
  return (
    <section
      className={`flex flex-row items-center gap-5 ${backgroundColor} px-5 py-3 text-white`}
    >
      <span className="text-2xl font-bold">{amount || 0}</span>
      <h2 className="text-xl">{title}</h2>
    </section>
  );
};

export default KdsStatusCards;
