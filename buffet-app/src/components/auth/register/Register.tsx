import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Loading from "../../ui/Loading";
import { RegisterData, useRegister } from "../../../hooks/useRegister";

const Register = () => {
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error, setError, register } = useRegister({
    ...formData,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register();
  };

  const handleResetRegister = () => {
    setError("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center gap-5 text-white"
    >
      <h1 className="text-2xl">Registrace</h1>
      <form onSubmit={handleSubmit} className="flex w-[300px] flex-col gap-3">
        <div className="flex flex-col gap-5">
          <input
            className="rounded-md border p-2 text-black"
            type="text"
            placeholder="Uživatelské jméno"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            className="rounded-md border p-2 text-black"
            type="email"
            placeholder="Zadejte email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          <input
            className="rounded-md border p-2 text-black"
            type="password"
            placeholder="Zadejte heslo"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <input
            className="rounded-md border p-2 text-black"
            type="password"
            placeholder="Potrvďte heslo"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col gap-1">
          <div className="text-center">
            Už máte účet?{" "}
            <Link
              to="/login"
              className="cursor-pointer text-cyan-400 hover:text-cyan-500"
            >
              Přihlásit se
            </Link>
            .
          </div>

          {error ? (
            <div className="text-wrap rounded-md bg-red-500 p-2 text-center">
              Chyba při registraci
            </div>
          ) : loading ? (
            <Loading />
          ) : (
            <Button type="submit">Přihlásit se</Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default Register;
