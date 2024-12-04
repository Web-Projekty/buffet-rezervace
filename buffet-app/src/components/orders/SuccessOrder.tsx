import { useNavigate } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { useEffect } from "react";
import Loading from "../Loading";
import { Order } from "../../types";
import { FETCH_URL } from "../../constants";

const SuccessOrder = () => {
  const navigate = useNavigate();

  const { data, error, isLoading } = useFetch<Order>(FETCH_URL, {
    requestType: "success-order",
  });

  useEffect(() => {
    if (!data) {
      navigate("/");
    }
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div className="text-center text-xl text-white">{error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-center text-2xl font-bold">
        Objednávka <span className="text-cyan-500">#{data?.id}</span> byla
        úspěšně vytvořena!
      </h1>
      <h2 className="text-xl">Nezapomeňte si ji včas vyzvednout.</h2>
    </div>
  );
};

export default SuccessOrder;
