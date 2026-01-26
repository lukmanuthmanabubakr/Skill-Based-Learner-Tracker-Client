import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

type Props = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: Props) {
  const { token } = useAppSelector((s) => s.auth);

  if (!token) return <Navigate to="/auth/login" replace />;

  return <>{children}</>;
}
