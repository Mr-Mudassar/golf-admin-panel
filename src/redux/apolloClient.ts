import { store } from "./configureStore";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";

const httpLink = new HttpLink({
  uri: "https://golfguiders-administration-884454497650.us-west1.run.app/graphql",
  headers: {
    "Apollo-Require-Preflight": "true",
  },
});

const authLink = setContext((_, { headers }) => {
  const token = store.getState().user.token;
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default apolloClient;
