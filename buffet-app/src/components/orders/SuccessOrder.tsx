import { Link, useLocation } from "react-router-dom";
import { Order } from "../../types";
import { ReactNode } from "react";

const SuccessOrder = () => {
  const location = useLocation();
  const order = location.state?.order as Order;

  /*if (!order) {
    return <PageNotFound />;
  }*/

  const renderSvg = (): ReactNode => {
    return (
      <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-none bg-slate-700 shadow-md shadow-black">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-20 w-20 text-cyan-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>
    );
  };

  return (
    <article className="flex flex-col items-center justify-center gap-5 text-white">
      {renderSvg()}
      <div className="flex flex-col items-center">
        <h1 className="text-center text-2xl font-bold">
          Objednávka{" "}
          <span className="text-cyan-500">#{order ? order.id : 256}</span> byla
          úspěšně vytvořena!
        </h1>
        <h2 className="text-xl">
          Můžete ji sledovat{" "}
          <Link
            to="/account?page=prehled"
            className="italic text-cyan-500 hover:text-cyan-600"
          >
            zde
          </Link>
          .
        </h2>
      </div>
    </article>
  );
};

export default SuccessOrder;
