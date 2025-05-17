import Layout from "./layout";
import NotFound from "./pages/404";
import routes from "./routes/allRoutes";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./routes/publicRoute";
import PrivateRoute from "./routes/privateRoute";
import React, { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadingScreen from "./components/loadingScreen";
import { setAppMode, setToken } from "./redux/features/userSlice";
import { BrowserRouter as Router, Routes, Route } from "react-router";

interface RouteConfig {
  path: string;
  exact?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: React.ComponentType<any>;
  isPublic?: boolean;
  role?: string;
}

// Higher-Order Component to wrap components with layouts
function withLayout(
  WrappedComponent: React.ComponentType<any>
): React.ComponentType<any> {
  const ComponentWithLayout: React.FC = (props) => (
    <Layout>
      <WrappedComponent {...props} />
    </Layout>
  );

  ComponentWithLayout.displayName = `WithLayout(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return ComponentWithLayout;
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const appMode = useSelector((state: any) => state.user.appMode);

  useEffect(() => {
    dispatch(
      setToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJlMGZiNDViOS1iYjkwLTQzMDYtOTRjYS02MjMxYjk1YTNjYmUiLCJlbWFpbCI6ImJpbGFsQHNldHViby5jb20iLCJpYXQiOjE3NDc0NzI2MjcsImV4cCI6MTc1MDA2NDYyN30.z0CW8zH3YpYDVAzg8zGnx8pPk4ds1uZDUZGzrk7Z4U0"
      )
    );
  }, []);

  useEffect(() => {
    CheckTheme();
    document.documentElement.classList.add("greenish");
  }, []);

  const CheckTheme = () => {
    if (appMode === "") {
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        document.documentElement.classList.add("dark");
        dispatch(setAppMode("dark"));
      } else {
        document.documentElement.classList.remove("dark");
        dispatch(setAppMode("light"));
      }
    } else if (appMode !== "" && appMode === "dark") {
      document.documentElement.classList.add("dark");
      dispatch(setAppMode("dark"));
    } else if (appMode !== "" && appMode === "light") {
      document.documentElement.classList.remove("dark");
      dispatch(setAppMode("light"));
    }
  };

  return (
    <>
      <Toaster />
      <Suspense
        fallback={
          <div>
            <LoadingScreen />
          </div>
        }
      >
        <Router>
          <Routes>
            {routes.map((route: RouteConfig, index: number) => {
              const ComponentWithLayout = withLayout(route.component);

              return route.isPublic ? (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PublicRoute
                      role={route.role}
                      component={ComponentWithLayout}
                    />
                  }
                />
              ) : (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <PrivateRoute
                      role={route.role}
                      component={ComponentWithLayout}
                    />
                  }
                />
              );
            })}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
