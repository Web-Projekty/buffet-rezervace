import { useState } from "react";
import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import Button from "../../ui/Button";
import { RegisterData, useRegister } from "../../../hooks/useRegister";
import Input from "../../ui/Input";
import { useUser } from "../../../hooks/useUser";
import { slideInRightAnimation } from "../../../animations/animations";

const Register = () => {
  const { user } = useUser();

  const [formData, setFormData] = useState<RegisterData>({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const { loading, error, register } = useRegister({
    ...formData,
  });

  if (user) {
    return <Navigate to="/account" />;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await register();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ErrorMessage = ({ name }: { name: string }) => {
    return error && error[name] ? (
      <p className="ml-2 text-sm text-red-500">{error[name]}</p>
    ) : null;
  };

  return (
    <motion.section
      {...slideInRightAnimation()}
      className="flex flex-col items-center justify-center gap-5 text-white"
    >
      <h1 className="text-2xl">Registrace</h1>
      <form onSubmit={handleSubmit} className="flex w-[300px] flex-col gap-2">
        <div>
          <Input
            id="fullName"
            name="fullName"
            inputClassName="rounded-md border p-2 text-black w-full"
            type="text"
            placeholder="Jméno a příjmení"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            displayStar
          />
          <ErrorMessage name="fullName" />
        </div>
        <div>
          <Input
            id="username"
            name="username"
            inputClassName="rounded-md border p-2 text-black w-full"
            type="text"
            placeholder="Uživatelské jméno"
            value={formData.username}
            onChange={handleInputChange}
            required
            displayStar
          />
          <ErrorMessage name="username" />
        </div>

        <div>
          <Input
            id="email"
            name="email"
            inputClassName="rounded-md border p-2 text-black w-full"
            type="email"
            placeholder="Zadejte email"
            value={formData.email}
            onChange={handleInputChange}
            required
            displayStar
          />
          <ErrorMessage name="email" />
        </div>

        <div>
          <Input
            id="password"
            name="password"
            inputClassName="rounded-md border p-2 text-black w-full"
            type="password"
            placeholder="Zadejte heslo"
            value={formData.password}
            onChange={handleInputChange}
            required
            displayStar
          />
          <ErrorMessage name="password" />
        </div>

        <div className="flex flex-col">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            inputClassName="rounded-md border p-2 text-black w-full"
            type="password"
            placeholder="Potrvďte heslo"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            displayStar
          />
          <ErrorMessage name="confirmPassword" />
        </div>

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

        <Button type="submit" loading={loading}>
          Registrovat se
        </Button>
      </form>
    </motion.section>
  );
};

export default Register;
