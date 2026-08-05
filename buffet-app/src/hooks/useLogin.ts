import { useState } from "react";
import axios from "axios";
import useSignInExport from "react-auth-kit/hooks/useSignIn";
import { useLocation, useNavigate } from "react-router-dom";
import { unwrapDefault } from "../utils/unwrapDefault";
import { FETCH_URL } from "../constants/constants";
import { setTokenExpiration } from "../utils/auth";
import toast from "react-hot-toast";
import { toastMessages } from "../utils/toastMessages";

const useSignIn = unwrapDefault(useSignInExport);

type UseLoginReturn = {
  loading: boolean;
  error: string;
  setError: (error: string) => void;
  login: (url?: string) => void;
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

type LoginResponse = {
  status: string;
  payload: {
    token: string;
    username: string;
    fullName: string;
    email: string;
    isAdmin: boolean;
    class: string;
  };
};

export const useLogin = (loginData: LoginData): UseLoginReturn => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const signIn = useSignIn<UserData>();
  const navigate = useNavigate();
  const location = useLocation();

  const fromCart = location.state?.fromCart || false;

  const login = async (url?: string) => {
    try {
      setLoading(true);
      const { data } = await axios.post<LoginResponse>(FETCH_URL, loginData);

      const success: boolean = data.status === "success";
      const isAdmin = data.payload.isAdmin;

      if (success) {
        signIn({
          auth: {
            token: data.payload.token,
            type: "Bearer",
          },
          userState: {
            fullName: data.payload.fullName,
            email: data.payload.email,
            isAdmin: isAdmin,
            class: data.payload.class,
          },
        });
        setTokenExpiration(data.payload.token as string);
        toast.success(toastMessages.login.success);
        navigate(url ? "/" + url : "/", {
          replace: true,
          state: { fromCart: fromCart },
        });
      } else {
        setError("Error occured");
        toast.error(toastMessages.login.error);
      }
    } catch {
      setError("Error occured");
      toast.error(toastMessages.login.error);
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
