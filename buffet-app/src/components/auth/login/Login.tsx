import React, { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useLogin } from "../../../hooks/useLogin";
import Loading from "../../ui/Loading";
import { Link } from "react-router-dom";

type LoginFormData = {
  username: string;
  password: string;
};

const loginShowAnimation = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

const Login = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "user4",
    password: "u",
  });

  const { loading, error, setError, login } = useLogin({
    requestType: "login",
    ...formData,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  const handleResetLogin = () => {
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) handleResetLogin();
  };

  return (
    <motion.section
      {...loginShowAnimation}
      className="mt-14 flex flex-col items-center justify-center gap-5 text-white md:mt-16 xl:mt-20"
    >
      <h1 className="text-2xl">Přihlášení</h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-[300px] flex-col gap-2 font-FiraSans"
      >
        <Input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          required={true}
          onChange={handleChange}
          className="w-full rounded-md border p-2 text-black"
          placeholder="Uživatelské jméno"
          disabled={loading}
        />
        <Input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          required={true}
          onChange={handleChange}
          className="w-full rounded-md border p-2 text-black"
          placeholder="Heslo"
          disabled={loading}
        />

        <div className="text-center text-base">
          Nejste ještě registrovaný?{" "}
          <Link
            to="/register"
            className="cursor-pointer text-cyan-400 hover:text-cyan-500"
          >
            Registruje se
          </Link>
        </div>
        {loading ? (
          <Loading />
        ) : (
          <Button type="submit" className="w-full">
            Přihlásit se
          </Button>
        )}
      </form>
    </motion.section>
  );
};

export default Login;
