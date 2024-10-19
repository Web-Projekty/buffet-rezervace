import axios from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Input from "../../Input";
import { setTokenExpiration } from "./login";
import Button from "../../Button";
import LoginError from "./LoginError";
import LoginLoading from "./LoginLoading";

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

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const login = useSignIn();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = {
      requestType: "login",
      username: "user4",
      password: "u",
    };

    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:8080/api",
        // "https://wlczak.vlastas.cc/backend/api",
        loginData,
      );

      const success: boolean = data.status === "success";
      console.log(data);

      if (success) {
        login({
          auth: {
            token: data.payload.token,
            type: "Bearer",
          },
          userState: {
            fullName: data.payload.fullName,
            email: data.payload.email,
            isAdmin: data.payload.isAdmin === 1 ? true : false,
            class: data.payload.class,
            orders: [],
          },
        });
        setTokenExpiration(3600);
        navigate("/");
      } else {
        setError("Error occured");
        console.log("Error occured");
      }
    } catch (error) {
      setError("Error occured");
      console.log(error);
    } finally {
      setLoading(false);
    }
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
