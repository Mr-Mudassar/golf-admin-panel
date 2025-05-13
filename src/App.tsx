import Layout from "./layout";
import routes from "./routes/allRoutes";
import React, { Suspense } from "react";
import { useDispatch } from "react-redux";
import PublicRoute from "./routes/publicRoute";
import PrivateRoute from "./routes/privateRoute";
// import LoadingScreen from "./components/LoadingScreen";
// import { updateFcmToken } from "./features/auth/authSlice";
// import { Toaster } from "react-hot-toast";
// import NotificationToaster from "./components/Notifica/tionToaster";
// import { useLazyNotificationApiQuery } from "./services/apiService";
import { BrowserRouter as Router, Routes, Route } from "react-router";
import LoadingScreen from "./components/loadingScreen";

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
  return (
    <>
      {/* <Toaster /> */}

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
                  element={<PublicRoute component={ComponentWithLayout} />}
                />
              ) : (
                <Route
                  key={index}
                  path={route.path}
                  element={<PrivateRoute component={ComponentWithLayout} />}
                />
              );
            })}
          </Routes>
        </Router>
      </Suspense>
    </>
  );
};

export default App;
