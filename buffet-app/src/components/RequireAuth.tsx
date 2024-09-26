import { ReactNode } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Navigate } from "react-router-dom";
import { User } from "../types";
import { dummyUser } from "../dummyData";

type ProtectedRouteProps = {
  children: ReactNode;
  requireAdmin: boolean;
};

const RequireAuth = ({ children, requireAdmin }: ProtectedRouteProps) => {
  const user: any = useAuthUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requireAdmin && !user?.isAdmin) {
    return <Navigate to="/menu" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
