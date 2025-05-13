import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

interface PublicRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  role?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  const token = useSelector((state: any) => state.user.token);

  return token ? <Navigate to={"/"} replace /> : <Component {...rest} />;
};

export default PublicRoute;
