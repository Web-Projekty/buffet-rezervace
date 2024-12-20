import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { scaleUpAnimation } from "../../animations";
import { removeTokenExpiration } from "./login/login";
import Button from "../Button";
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
    <div className="flex h-[220px] w-[22rem] flex-col justify-center gap-5 md:w-[300px]">
      <h1 className="text-2xl">{isAdmin ? "Administrátor" : "Uživatel"}</h1>
      <motion.div
        {...scaleUpAnimation(0.5)}
        className="rounded-md bg-slate-900 p-4"
      >
        <h2 className="text-2xl font-bold">{fullName}</h2>
        <p className="text-lg">Email: {email}</p>
        <p className="text-lg">Třída: {userClass}</p>
      </motion.div>

      <Button onClick={handleLogout}>Odhlásit</Button>
    </div>
  );
};

export default AccountInformation;
