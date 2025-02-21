import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { extractToken, handleResponse } from "../components/utils/utils";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "../types";
import { toastMessages } from "../components/utils/toastMessages";
import { updateUserData, updateUserPassword } from "../components/utils/api";
import { ProfileFormDataType } from "../components/auth/dashboard/Profile";

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
};

export const useUser = (): UseUserReturn => {
  const header: string | null = useAuthHeader();
  const user: User | null = useAuthUser();
  const token: string | null = extractToken(header);

  const isAdmin: boolean = user?.isAdmin || false;
  const fullName: string | null = user?.fullName || null;
  const email: string | null = user?.email || null;
  const classTitle: string | null = user?.class || null;
  const tel: string | null = user?.tel || null;
  const credits: string | null = user?.credits || null;

  const handleSavePassword = async (formData: ProfileFormDataType) => {
    const { password, newPassword, newPasswordConfirmation } = formData;

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
  };

  const handleSaveInfo = async (formData: ProfileFormDataType) => {
    const { name, email, tel } = formData;

    const response = await updateUserData(token, name, tel, email);

    handleResponse(
      response.status,
      toastMessages.profileChange.success,
      toastMessages.profileChange.error,
    );
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
  };
};
