import { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { setTokenExpiration } from "../components/auth/login/login";
import { FETCH_URL } from "../constants";

type UseLoginReturn = {
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  login: () => void;
};

type LoginData = {
  requestType: string;
  username: string;
  password: string;
};

export type UserData = {
  fullName: string;
  email: string;
  isAdmin: boolean;
  class: string;
};

export const useLogin = (loginData: LoginData): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const signIn = useSignIn<UserData>();
  const navigate = useNavigate();

  const login = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        FETCH_URL,
        // "http://localhost:8080/api",
        loginData,
      );

      const success: boolean = data.status === "success";

      if (success) {
        signIn({
          auth: {
            token: data.payload.token,
            type: "Bearer",
          },
          // refresh:
          //   "5iQldrf4LwmkgVPoiVBCSRzDu4qeIFOyKdqT3OtJbXJI1Vxmzge0Au11dGmMbeuI",
          userState: {
            fullName: data.payload.fullName,
            email: data.payload.email,
            isAdmin: data.payload.isAdmin === 1 ? true : false,
            class: data.payload.class,
          },
        });
        setTokenExpiration(data.payload.token);
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
