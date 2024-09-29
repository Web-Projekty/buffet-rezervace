import { ReactNode } from "react";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

import { Navigate } from "react-router-dom";
import { User } from "../../types";
import { dummyUser } from "../../dummyData";

type ProtectedRouteProps = {
  children: ReactNode;
  requireAdmin: boolean;
  fallbackPath: string;
};

const RequireAuth = ({
  children,
  requireAdmin,
  fallbackPath,
}: ProtectedRouteProps) => {
  const user: User = dummyUser;
  // const user: User | null = useAuthUser();

  if (!user) {
    console.log("User not authenticated");
    return <Navigate to={fallbackPath} />;
  }

  console.log("User authenticated", user);

  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/menu" />;
  }

  return <>{children}</>;
};

export default RequireAuth;
