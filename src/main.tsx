import "./index.css";
import App from "./App.tsx";
import { StrictMode } from "react";
import { Provider } from "react-redux";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "./redux/apolloClient.ts";
import { persistor, store } from "./redux/configureStore.ts";
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
);
