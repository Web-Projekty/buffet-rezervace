import { Link, useSearchParams } from "react-router-dom";
import { Check } from "lucide-react";
import PageNotFound from "../error/PageNotFound";

const SuccessOrder = () => {
  const [searchParams] = useSearchParams();

  if (
    searchParams.get("payment_uid") === null ||
    searchParams.get("project_id") === null
  ) {
    return <PageNotFound />;
  }

  return (
    <article className="flex flex-col items-center justify-center gap-5 text-white">
      <div className="flex h-28 w-28 items-center justify-center rounded-full border-2 border-none bg-slate-700 shadow-md shadow-black">
        <Check size={64} className="text-cyan-500" />
      </div>
      <div className="flex flex-col items-center gap-5">
        <h1 className="max-w-[22rem] text-center text-2xl font-bold">
          Vaše objednávka byla úspěšně vytvořena
        </h1>
        <h2 className="text-xl">
          Můžete ji sledovat{" "}
          <Link
            to="/account?page=prehled"
            className="italic text-interactiveColor hover:text-interactiveHoverColor"
            replace
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
