import axios from "axios";
import { FETCH_URL } from "../constants";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { UserData } from "./useLogin";
import toast from "react-hot-toast";
import { toastMessages } from "../components/utils/toastMessages";

type UseRegisterReturn = {
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  register: () => void;
};

export type RegisterData = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
};

export const useRegister = (registerData: RegisterData): UseRegisterReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const signIn = useSignIn<UserData>();
  const navigate = useNavigate();

  const register = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(FETCH_URL, {
        requestType: "register",
        ...registerData,
      });

      const success: boolean = data.status === "success";

      if (success) {
        signIn({
          auth: {
            token: data.payload.token,
            type: "Bearer",
          },
          userState: {
            ...data.payload.data,
          },
        });
        toast.success(toastMessages.register.success);
        navigate("/login", { replace: true });
      } else {
        setError("Error occured");
        toast.error(toastMessages.register.error);
      }
    } catch {
      setError("Error occured");
      toast.error(toastMessages.register.error);
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
