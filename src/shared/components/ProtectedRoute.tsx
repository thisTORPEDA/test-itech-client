import { FC, PropsWithChildren, ReactElement } from "react";
import { Navigate } from "react-router-dom";

export const ProtectedRoute: FC<PropsWithChildren> = ({
  children,
}): ReactElement => {
  const isAuth = localStorage.getItem("token") !== null;

  if (!isAuth) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
