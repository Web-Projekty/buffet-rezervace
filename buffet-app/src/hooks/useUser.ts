import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { extractToken } from "../components/utils/utils";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { User } from "../types";

type UseUserReturn = {
  user: User | null;
  token: string | null;
};

export const useUser = (): UseUserReturn => {
  const header: string | null = useAuthHeader();
  const user: User | null = useAuthUser();
  const token = extractToken(header);

  return { user, token };
};
