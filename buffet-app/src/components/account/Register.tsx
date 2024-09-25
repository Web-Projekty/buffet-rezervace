import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";

type LoginFormType = {
  username: string;
  email: string;
  class: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const [formData, setFormData] = useState<LoginFormType>({
    username: "user4",
    email: "user4@mail.com",
    class: "2.Y",
    password: "u",
    confirmPassword: "u",
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const loginData = {
      requestType: "register",
      username: "user4",
      password: "u",
    };
    try {
      setLoading(true);
      const response = await axios.post("http://localhost/api", loginData);

      const success: boolean = response.data.success;
      console.log(response.data);

      if (success) {
        console.log("Registered");
        setLoading(false);
        navigate("/login");
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

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1 }}
      className="flex h-screen flex-col items-center justify-center gap-10 text-white"
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
          <div className="flew flex flex-row items-center justify-center gap-5">
            <label htmlFor="class">Ročník a třída: </label>
            <select
              name="class"
              id="class"
              className="rounded-md p-2 text-black"
            >
              <option value="1.">1.</option>
              <option value="2.">2.</option>
              <option value="3.">3.</option>
              <option value="4.">4.</option>
            </select>
            <select
              name="class"
              id="class"
              className="rounded-md p-2 text-black"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
              <option value="G">G</option>
              <option value="H">H</option>
              <option value="I">I</option>
            </select>
          </div>

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
          <div className="text-center">
            Už máš účet?{" "}
            <span
              className="cursor-pointer text-orange-300"
              onClick={handleLogin}
            >
              Přihlaš se
            </span>
            .
          </div>
        </div>
        {error ? (
          <div className="text-wrap rounded-md bg-red-500 p-2 text-center">
            Chyba při registraci
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

export default Register;
