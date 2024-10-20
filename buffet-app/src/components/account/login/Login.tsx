import { useState } from "react";
import { motion } from "framer-motion";
import Input from "../../Input";
import Button from "../../Button";
import LoginError from "./LoginError";
import LoginLoading from "./LoginLoading";
import useLogin from "../../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

type LoginForm = {
  username: string;
  password: string;
};

const loginShowAnimation = {
  initial: { opacity: 0, x: 50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 },
};

const Login = () => {
  const [formData, setFormData] = useState<LoginForm>({
    username: "user4",
    password: "u",
  });

  const navigate = useNavigate();

  const { loading, error, setError, login } = useLogin(
    { requestType: "login", ...formData },
    "https://wlczak.vlastas.cc/backend/api",
  );

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login();
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleResetLogin = () => {
    setError("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) handleResetLogin();
  };

  return (
    <motion.div
      {...loginShowAnimation}
      className="flex h-screen flex-col items-center justify-center gap-5 text-white"
    >
      <h1 className="text-2xl">Příhlášení</h1>
      <form onSubmit={handleSubmit} className="flex w-[300px] flex-col gap-3">
        <div className="flex flex-col gap-5">
          <Input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            required={true}
            onChange={handleChange}
            className="rounded-md border p-2 text-black"
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
            className="rounded-md border p-2 text-black"
            placeholder="Heslo"
            disabled={loading}
          />
          <div className="text-center">
            Ještě nejsi registrovaný?{" "}
            <span
              className="cursor-pointer text-cyan-500"
              onClick={handleRegister}
            >
              Registruj se
            </span>
            .
          </div>
        </div>
        <div className="flex w-full items-center justify-center">
          {error ? (
            <LoginError />
          ) : loading ? (
            <LoginLoading />
          ) : (
            <Button type="submit" additionalStyles="w-full">
              Přihlásit se
            </Button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default Login;
