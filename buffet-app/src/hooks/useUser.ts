import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { extractToken } from "../components/utils/utils";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "../types";

type UseUserReturn = {
  user: User | null;
  token: string | null;
  isAdmin: boolean;
  fullName: string | null;
  email: string | null;
  classTitle: string | null;
};

export const useUser = (): UseUserReturn => {
  const header: string | null = useAuthHeader();
  const user: User | null = useAuthUser();
  const token: string = extractToken(header);
  const isAdmin: boolean = user?.isAdmin || false;
  const fullName: string | null = user?.fullName || null;
  const email: string | null = user?.email || null;
  const classTitle: string | null = user?.class || null;

  return { user, token, isAdmin, fullName, email, classTitle };
};
