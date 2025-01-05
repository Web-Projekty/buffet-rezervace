import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Button from "../../ui/Button";
import Loading from "../../ui/Loading";
import { RegisterData, useRegister } from "../../../hooks/useRegister";
import Input from "../../ui/Input";

const Register = () => {
  const [formData, setFormData] = useState<RegisterData>({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error, setError, register } = useRegister({
    ...formData,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Hesla se neshodují.");
      return;
    }

    register();
  };

  const handleResetRegister = () => {
    setError("");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) handleResetRegister();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="flex flex-col items-center justify-center gap-5 text-white"
    >
      <h1 className="text-2xl">Registrace</h1>
      <form onSubmit={handleSubmit} className="flex w-[300px] flex-col gap-2">
        <Input
          id="username"
          name="username"
          inputClassName="rounded-md border p-2 text-black"
          type="text"
          placeholder="Uživatelské jméno"
          value={formData.username}
          onChange={handleInputChange}
          required
        />
        <Input
          id="email"
          name="email"
          inputClassName="rounded-md border p-2 text-black"
          type="email"
          placeholder="Zadejte email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <Input
          id="phone"
          name="phone"
          inputClassName="rounded-md border p-2 text-black"
          type="tel"
          placeholder="Zadejte telefonní číslo"
          value={formData.phone}
          onChange={handleInputChange}
        />

        <Input
          id="password"
          name="password"
          inputClassName="rounded-md border p-2 text-black"
          type="password"
          placeholder="Zadejte heslo"
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        <Input
          id="confirmPassword"
          name="confirmPassword"
          inputClassName="rounded-md border p-2 text-black"
          type="password"
          placeholder="Potrvďte heslo"
          value={formData.confirmPassword}
          onChange={handleInputChange}
          required
        />

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
            {error}
          </div>
        ) : loading ? (
          <Loading />
        ) : (
          <Button type="submit">Přihlásit se</Button>
        )}
      </form>
    </motion.div>
  );
};

export default Register;
