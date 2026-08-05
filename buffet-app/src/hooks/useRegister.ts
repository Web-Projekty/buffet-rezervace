import axios from "axios";
import { FETCH_URL } from "../constants/constants";
import { useState } from "react";
import useSignInExport from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router";
import { unwrapDefault } from "../utils/unwrapDefault";
import { UserData } from "./useLogin";
import toast from "react-hot-toast";
import { toastMessages } from "../utils/toastMessages";
import { registerSchema } from "../utils/validation";
import { z } from "zod";

const useSignIn = unwrapDefault(useSignInExport);

export type RegisterData = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  [key: string]: string;
};

type RegisterError = Record<string, string>;

export const useRegister = (registerData: RegisterData) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<RegisterError>();
  const signIn = useSignIn<UserData>();
  const navigate = useNavigate();

  const register = async () => {
    try {
      setLoading(true);

      await registerSchema.parseAsync(registerData);

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
        setError({});
        navigate("/login", { replace: true });
      } else {
        setError({
          register: toastMessages.register.error,
        });
        toast.error(toastMessages.register.error);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        setError(fieldErrors as unknown as Record<string, string>);
      } else {
        setError({
          register: toastMessages.register.error,
        });
        toast.error(toastMessages.register.error);
      }
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
