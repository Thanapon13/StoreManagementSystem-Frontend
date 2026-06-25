import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import type { UserRole } from "@/types/user";

type ProtectedRouteProps = {
  allowedRoles?: UserRole[];
};

const ProtectedRoute = ({ allowedRoles }: ProtectedRouteProps) => {
  const { user, initialLoading } = useAuth();

  if (initialLoading) return null;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
