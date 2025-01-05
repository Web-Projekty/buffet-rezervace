import { useUser } from "../../../hooks/useUser";

const CartUserInformation = () => {
  const { token, fullName, email } = useUser();

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-backgroundColor p-3">
      {token ? (
        <>
          <div className="flex flex-col">
            <h3 className="font-bold">Jméno a příjmení</h3>
            <p className="ml-3 text-sm">{fullName}</p>
          </div>
          <div className="flex flex-col">
            <h3 className="font-bold">Emailová adresa</h3>
            <p className="ml-3 text-sm">{email}</p>
          </div>
        </>
      ) : (
        "Pro pokračování se prosím přihlaste"
      )}
    </div>
  );
};

export default CartUserInformation;
