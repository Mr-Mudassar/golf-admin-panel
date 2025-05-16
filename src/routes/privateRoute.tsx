import React from "react";
// import { Navigate } from "react-router";
// import { useSelector } from "react-redux";

interface PrivateRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  role?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  ...rest
}) => {
  // const  token  = useSelector((state: any) => state.user.token);
  // return token ? <Component {...rest} /> : <Navigate to={"/"} replace />;
  return <Component {...rest} />;
};

export default PrivateRoute;
