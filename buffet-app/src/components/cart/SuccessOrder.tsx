import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const SuccessOrder = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const orderId = searchParams.get("id");
    if (!orderId) {
      navigate("/");
    }
  }, [searchParams, navigate]);

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <span className="text-[8rem]"></span>
      <h1 className="text-2xl font-bold">
        Objednávka{" "}
        <span className="text-cyan-500">#{searchParams.get("id")}</span> byla
        úspěšně vytvořena!
      </h1>
      <h2 className="text-xl">Nezapomeňte si ji včas vyzvednout.</h2>
    </div>
  );
};

export default SuccessOrder;
