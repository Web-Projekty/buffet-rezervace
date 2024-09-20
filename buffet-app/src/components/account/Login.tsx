import axios from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";

interface LoginFormType {
  username: string;
  password: string;
}

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
          },
          userState: { name: "Manas Baroi", role: "admin" },
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

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-10 text-white">
      <h1 className="text-2xl">Příhlášení</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
        </div>
        {error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : loading ? (
          <p className="text-center text-orange-400">Přihlašování...</p>
        ) : (
          <button
            className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
            type="submit"
          >
            Přihlásit se
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
