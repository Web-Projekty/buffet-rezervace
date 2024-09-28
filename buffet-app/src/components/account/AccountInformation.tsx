import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User } from "../../types";

const AdminButtons = ({ handleMenuEdit }: { handleMenuEdit: () => void }) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <button
        className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
        onClick={handleMenuEdit}
      >
        Upravit menu
      </button>
    </div>
  );
};

const AccountInformation = ({ user }: { user: User }) => {
  const logout = useSignOut();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleMenuEdit = () => {
    navigate("/menu/edit");
  };

  return (
    <div className="flex h-[220px] w-full flex-col justify-center gap-5 md:w-[300px]">
      <h1 className="text-2xl">
        {user.isAdmin ? "Administrátor" : "Uživatel"}
      </h1>
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="rounded-md bg-slate-900 p-4"
      >
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-lg">Email: {user.email}</p>
        <p className="text-lg">Třída: {user.class}</p>
      </motion.div>

      <button
        className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
        onClick={handleLogout}
      >
        Logout
      </button>
      {user.isAdmin && <AdminButtons handleMenuEdit={handleMenuEdit} />}
    </div>
  );
};

export default AccountInformation;
