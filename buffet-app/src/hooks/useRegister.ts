import axios from "axios";
import { FETCH_URL } from "../constants";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { UserData } from "./useLogin";

type UseRegisterReturn = {
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  register: () => void;
};

type RegisterData = {
  username: string;
  email: string;
  class: string;
  password: string;
  confirmPassword: string;
};

export const useRegister = (registerData: RegisterData): UseRegisterReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const signIn = useSignIn<UserData>();
  const navigate = useNavigate();

  const register = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(
        FETCH_URL,
        // "http://localhost:8080/api",
        registerData,
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
        navigate("/login");
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
    register,
  };
};
