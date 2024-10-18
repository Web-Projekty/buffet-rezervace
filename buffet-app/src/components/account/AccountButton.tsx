import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";

const AccountButton = () => {
  return (
    <Link to="/account">
      <div className="rounded-full bg-white p-2 hover:cursor-pointer">
        <GoPerson size={36} />
      </div>
    </Link>
  );
};

export default AccountButton;
