import axios from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { tailspin } from "ldrs";

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
      const response = await axios.post("http://localhost/api", loginData);

      const success: boolean = response.data.success;
      console.log(response.data);

      if (success) {
        login({
          auth: {
            token: response.data.token,
            type: "Bearer",
          },
          userState: {
            fullName: response.data.fullName,
            email: response.data.email,
            isAdmin: response.data.isAdmin,
            class: response.data.class,
            orders: {},
          },
        });
        console.log("Logged in");
        setLoading(false);
        navigate("/account");
      } else {
        setError("Error occured");
        console.log("Error occured");
        setLoading(false);
      }
    } catch (error) {
      setError("Error occured");
      console.log(error);
      setLoading(false);
    }
  };

  const handleRegister = () => {
    navigate("/register");
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
          <input
            className="rounded-md border p-2 text-black"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
          <input
            className="rounded-md border p-2 text-black"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
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
          <div className="text-wrap rounded-md bg-red-500 p-2 text-center">
            Špatné heslo nebo uživatelské jméno
          </div>
        ) : loading ? (
          <div className="flex items-center justify-center">
            <l-tailspin size="30" stroke="5" speed="0.9" color="white" />
          </div>
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
