import { ApolloProvider } from '@apollo/client';
import React from 'react';

import Theme from './components/Theme';
import verifyGithubToken, { getGithubToken } from './config/githubToken';
import createClient from './config/graphql';
import SearchRepositoriesPage from './repository/pages/SearchRepositoriesPage';

// Check for a Github token existence on session storage
// if doesn't, raise an error
verifyGithubToken();

// create a GraphQL client for Github API with a provided Personal Access Token
const gqlClient = createClient(getGithubToken);

const App: React.FC = () => {
  return (
    <ApolloProvider client={gqlClient}>
      <Theme>
        <SearchRepositoriesPage />
      </Theme>
    </ApolloProvider>
  );
};

export default App;
