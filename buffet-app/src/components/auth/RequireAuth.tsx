import { ReactNode } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Navigate } from "react-router-dom";
import { User } from "../../types";
import { isTokenExpired } from "./login/login";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import PageNotFound from "../error/PageNotFound";

type ProtectedRouteProps = {
  children: ReactNode;
  requireAdmin: boolean;
  fallbackPath?: string;
};

const RequireAuth = ({
  children,
  requireAdmin,
  fallbackPath,
}: ProtectedRouteProps) => {
  // const user: User = dummyUser;
  const user: User = useAuthUser()!;
  const logout = useSignOut();

  if (!user) {
    console.log("User not authenticated");
    return fallbackPath ? <Navigate to={fallbackPath} /> : <PageNotFound />;
  }

  if (isTokenExpired()) {
    console.log("Token expired");
    logout();
    return <Navigate to={fallbackPath ? fallbackPath : "/login"} />;
  }

  console.log("User authenticated", user);

  if (requireAdmin && !user.isAdmin) {
    return <PageNotFound />;
  }

  return <>{children}</>;
};

export default RequireAuth;
