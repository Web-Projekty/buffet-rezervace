import { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { setTokenExpiration } from "../components/account/login/login";

type UseLoginReturn = {
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  login: () => void;
};

const useLogin = (
  loginData: { requestType: string; username: string; password: string },
  url: string,
): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const signIn = useSignIn();
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        url,
        // "http://localhost:8080/api",
        loginData,
      );

      const success: boolean = data.status === "success";
      //   console.log(data);

      if (success) {
        signIn({
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

  return {
    loading,
    error,
    setError,
    login,
  };
};

export default useLogin;
