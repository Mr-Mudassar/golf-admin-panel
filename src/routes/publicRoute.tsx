// import { Navigate } from "react-router";
// import { useSelector } from "react-redux";

interface PublicRouteProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  role?: string;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  ...rest
}) => {
  // const token = useSelector((state: any) => state.user.token);
  // return token ? <Navigate to={"/"} replace /> : <Component {...rest} />;
  return <Component {...rest} />;
};

export default PublicRoute;
