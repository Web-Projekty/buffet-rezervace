import Button from "../ui/Button";

type FetchErrorProps = {
  refetch?: () => void;
};

const FetchError = ({ refetch }: FetchErrorProps) => {
  const handleClick = () => {
    if (!refetch) return;
    refetch();
  };
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p>Chyba při načítání dat.</p>
      <Button onClick={handleClick}>Zkusit znovu</Button>
    </div>
  );
};

export default FetchError;
