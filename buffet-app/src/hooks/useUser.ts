import useAuthHeaderExport from "react-auth-kit/hooks/useAuthHeader";
import { extractToken, handleResponse } from "../utils/utils";
import useAuthUserExport from "react-auth-kit/hooks/useAuthUser";
import { User } from "../types/types";
import { toastMessages } from "../utils/toastMessages";
import { updateUserData, updateUserPassword } from "../utils/api";
import { ProfileFormDataType } from "../components/dashboard/Profile";
import { removeTokenExpiration } from "../utils/auth";
import useSignOutExport from "react-auth-kit/hooks/useSignOut";
import { useNavigate } from "react-router-dom";
import { unwrapDefault } from "../utils/unwrapDefault";
import toast from "react-hot-toast";
import { useState } from "react";
import {
  changePasswordSchema,
  changeUserDataSchema,
} from "../utils/validation";
import { z } from "zod";

const useAuthHeader = unwrapDefault(useAuthHeaderExport);
const useAuthUser = unwrapDefault(useAuthUserExport);
const useSignOut = unwrapDefault(useSignOutExport);

type UseUserReturn = {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  fullName: string | null;
  email: string | null;
  classTitle: string | null;
  tel: string | null;
  credits: string | null;
  handleSavePassword: (formData: ProfileFormDataType) => void;
  handleSaveInfo: (formData: ProfileFormDataType) => void;
  logout: () => void;
  loading: boolean;
};

export const useUser = (): UseUserReturn => {
  const header: string | null = useAuthHeader();
  const user: User | null = useAuthUser();
  const token: string | null = extractToken(header);
  const signOut = useSignOut();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const isAdmin: boolean = user?.isAdmin || false;
  const fullName: string = user?.fullName || "";
  const email: string = user?.email || "";
  const classTitle: string | null = user?.class || null;
  const tel: string = user?.tel || "";
  const credits: string | null = user?.credits || null;

  const handleSavePassword = async (formData: ProfileFormDataType) => {
    const { password, newPassword, newPasswordConfirmation } = formData;
    try {
      setLoading(true);

      const passwordData = {
        oldPassword: password,
        newPassword,
        confirmPassword: newPasswordConfirmation,
      };

      await changePasswordSchema(token).parseAsync(passwordData);

      const response = await updateUserPassword(
        token,
        password,
        newPassword,
        newPasswordConfirmation,
      );

      handleResponse(
        response.status,
        toastMessages.passwordChange.success,
        toastMessages.passwordChange.error,
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        toast.error(Object.values(fieldErrors).join("\n"));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSaveInfo = async (formData: ProfileFormDataType) => {
    const { name, email, tel } = formData;

    try {
      setLoading(true);

      const userData = {
        fullName: name,
        tel,
        email,
      };

      await changeUserDataSchema.parseAsync(userData);

      const response = await updateUserData(token, name, tel, email);
      handleResponse(
        response.status,
        toastMessages.profileChange.success,
        toastMessages.profileChange.error,
      );
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors = err.flatten().fieldErrors;
        toast.error(Object.values(fieldErrors).join("\n"));
      } else {
        toast.error(toastMessages.register.error);
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    signOut();
    removeTokenExpiration();
    toast.success(toastMessages.logout.success);
    navigate("/login", { replace: true });
  };

  return {
    user,
    token,
    isAdmin,
    fullName,
    email,
    classTitle,
    tel,
    credits,
    handleSavePassword,
    handleSaveInfo,
    logout,
    loading,
  };
};
