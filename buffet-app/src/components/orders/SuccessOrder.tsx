import { useLocation } from "react-router-dom";
import { Order } from "../../types";
import PageNotFound from "../error/PageNotFound";

const SuccessOrder = () => {
  const location = useLocation();
  const order = location.state?.order as Order;

  /*if (!order) {
    return <PageNotFound />;
  }*/

  return (
    <div className="flex flex-col items-center justify-center text-white">
      <h1 className="text-center text-2xl font-bold">
        Objednávka{" "}
        <span className="text-cyan-500">#{order ? order.id : 256}</span> byla
        úspěšně vytvořena!
      </h1>
      <h2 className="text-xl">Nezapomeňte si ji včas vyzvednout.</h2>
    </div>
  );
};

export default SuccessOrder;
