import { useState } from "react";
import axios from "axios";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useNavigate } from "react-router-dom";
import { FETCH_URL } from "../constants";
import { setTokenExpiration } from "../components/utils/auth";
import toast from "react-hot-toast";

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
      const { data } = await axios.post(FETCH_URL, loginData);

      const success: boolean = data.status === "success";

      const isAdmin = data.payload.isAdmin === 1;

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
            isAdmin: isAdmin,
            class: data.payload.class,
          },
        });
        setTokenExpiration(data.payload.token as string);
        toast.success("Přihlášení proběhlo úspěšně");
        navigate("/", { replace: true });
        if (isAdmin) window.location.reload();
      } else {
        setError("Error occured");
        console.log("Error occured");
        toast.error("Chyba při přihlášení");
      }
    } catch (error) {
      setError("Error occured");
      console.log(error);
      toast.error("Chyba při přihlášení");
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
