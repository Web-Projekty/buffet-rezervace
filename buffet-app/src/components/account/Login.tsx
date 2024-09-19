import axios from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";

const Login = () => {
  const [error, setError] = useState("");
  const login = useSignIn();

  const loginHandler = async () => {
    const loginData = {
      requestType: "login",
      username: "user4",
      password: "u",
    };
    try {
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
      } else {
        setError("Error occured");
        console.log("Error occured");
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (error) {
    return (
      <div className="flex items-center justify-center text-2xl">{error}</div>
    );
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        className="rounded-md border bg-cyan-500 p-2 text-white hover:bg-cyan-700"
        onClick={loginHandler}
      >
        Log In!!
      </button>
    </div>
  );
};

export default Login;
