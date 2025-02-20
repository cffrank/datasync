import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'https://api.getjobber.com/api/graphql',
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      'X-API-Version': '2024-02',
      authorization: `Bearer ${process.env.JOBBER_API_KEY}`,
    }
  };
});

export const jobberClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
  },
});
