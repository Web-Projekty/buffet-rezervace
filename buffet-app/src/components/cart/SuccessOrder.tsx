import { useSearchParams } from "react-router-dom";

const SuccessOrder = () => {
  const [searchParams] = useSearchParams();
  return (
    <div className="flex flex-col items-center justify-center text-white">
      <span className="text-[8rem]"></span>
      <h1 className="text-2xl font-bold">{`Objednávka #${searchParams.get("id")} byla úspěšně vytvořena!`}</h1>
      <h2 className="text-xl">Nezapomeňte si ji včas vyzvedvout.</h2>
    </div>
  );
};

export default SuccessOrder;
