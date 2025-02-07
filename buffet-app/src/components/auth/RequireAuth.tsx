import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import useSignOut from "react-auth-kit/hooks/useSignOut";
import { useUser } from "../../hooks/useUser";
import { isTokenExpired } from "../utils/auth";

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
  const { user } = useUser();
  const logout = useSignOut();

  if (!user) {
    console.log("User not authenticated");
    return fallbackPath ? (
      <Navigate to={fallbackPath} />
    ) : (
      <Navigate to="/page-not-found" />
    );
  }

  if (isTokenExpired()) {
    console.log("Token expired");
    logout();
    return <Navigate to={fallbackPath ? fallbackPath : "/login"} />;
  }

  console.log("User authenticated", user);

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/page-not-found" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
