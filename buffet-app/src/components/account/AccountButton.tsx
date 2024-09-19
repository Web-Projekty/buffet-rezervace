import { GoPerson } from "react-icons/go";
import { Link } from "react-router-dom";

const AccountButton = () => {
  return (
    <div className="rounded-full bg-white p-2 hover:cursor-pointer">
      <Link to="/account">
        <GoPerson size={36} />
      </Link>
    </div>
  );
};

export default AccountButton;
