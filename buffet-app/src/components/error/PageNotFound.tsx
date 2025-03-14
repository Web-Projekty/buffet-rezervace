import ErrorComponent from "./ErrorComponent";

type PageNotFoundProps = {
  className?: string;
};

const PageNotFound = ({ className }: PageNotFoundProps) => {
  return (
    <ErrorComponent
      title="Tato stránka neexistuje."
      subtitle="🕵️‍♂️🔎"
      className={className}
    />
  );
};

export default PageNotFound;
