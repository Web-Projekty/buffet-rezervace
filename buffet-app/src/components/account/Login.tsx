import axios from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { tailspin } from "ldrs";
import Input from "../Input";

tailspin.register();

type LoginFormType = {
  username: string;
  password: string;
};

const Login = () => {
  const [formData, setFormData] = useState<LoginFormType>({
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
        // "http://localhost:8080/api",
        "https://wlczak.vlastas.cc/backend/api",
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
        console.log("Logged in");
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

  const LoginError = () => {
    return (
      <div className="flex w-full flex-col items-center gap-2 text-center">
        <span className="text-wrap rounded-md bg-red-500 p-2">
          Špatné heslo nebo uživatelské jméno
        </span>
      </div>
    );
  };

  const LoginLoading = () => {
    return (
      <div className="flex items-center justify-center">
        <l-tailspin size="30" stroke="5" speed="0.9" color="white" />
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
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
          />
          <div className="text-center">
            Ještě nejsi registrovaný?{" "}
            <span
              className="cursor-pointer text-orange-300"
              onClick={handleRegister}
            >
              Registruj se
            </span>
            .
          </div>
        </div>
        {error ? (
          <LoginError />
        ) : loading ? (
          <LoginLoading />
        ) : (
          <button
            className="rounded-md border bg-orange-400 p-2 text-white hover:bg-orange-500"
            type="submit"
          >
            Přihlásit se
          </button>
        )}
      </form>
    </motion.div>
  );
};

export default Login;
