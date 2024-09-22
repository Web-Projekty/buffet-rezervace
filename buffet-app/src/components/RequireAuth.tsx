import { ReactNode } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Navigate } from "react-router-dom";

type ProtectedRouteProps = {
  children: ReactNode;
};

const RequireAuth = ({ children }: ProtectedRouteProps) => {
  const user = useAuthUser();
  // console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return <>{children}</>;
};

export default RequireAuth;
