import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { scaleUpAnimation } from "../../animations";
import { removeTokenExpiration } from "./login/login";
import Button from "../ui/Button";
import { useUser } from "../../hooks/useUser";

const AccountInformation = () => {
  const { user } = useUser();
  const logout = useSignOut();
  const navigate = useNavigate();

  const { isAdmin, fullName, email, class: userClass } = user!;

  const handleLogout = () => {
    logout();
    removeTokenExpiration();
    navigate("/login");
    window.location.reload();
  };

  return (
    <div className="flex w-full flex-row justify-between">
      <motion.div
        {...scaleUpAnimation(0.5)}
        className="flex flex-row items-center gap-2 rounded-lg bg-slate-900 p-2"
      >
        <h2>
          <span className="font-bold">
            {isAdmin ? "Administrátor" : "Uživatel"}:{" "}
          </span>
          {fullName}
        </h2>
        <p>
          <span className="font-bold">Email:</span> {email}
        </p>
        {userClass && (
          <p>
            <span className="font-bold">Třída:</span> {userClass}
          </p>
        )}
      </motion.div>

      <Button onClick={handleLogout}>Odhlásit se</Button>
    </div>
  );
};

export default AccountInformation;
