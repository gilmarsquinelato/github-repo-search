import { setContext } from '@apollo/client/link/context';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';

const createClient = (
  getToken: () => string | null,
): ApolloClient<NormalizedCacheObject> => {
  const client = new ApolloClient({
    link: authLink(getToken).concat(httpLink),
    cache: new InMemoryCache(),
  });

  return client;
};

export default createClient;

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
});

const authLink = (getToken: () => string | null) =>
  setContext((_, { headers }) => {
    // get the authentication token
    const token = getToken();
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
