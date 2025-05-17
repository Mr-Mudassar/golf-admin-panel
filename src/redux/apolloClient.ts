// apollo-client.ts
import { store } from "./configureStore";
import { setContext } from "@apollo/client/link/context";
import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";

const httpLink = createHttpLink({
  // uri: "https://golfguiders-be-v2-884454497650.us-west1.run.app/graphql",
  uri: "https://golfguiders-administration-884454497650.us-west1.run.app",
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

// 3. Create Apollo Client instance
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default apolloClient;
