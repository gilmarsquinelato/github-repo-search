import React from 'react';
import debounce from 'lodash/debounce';
import Typography from '@material-ui/core/Typography';

import SearchInput from '../components/SearchInput';
import RepositoryTable from '../components/RepositoryTable';

const Home: React.FC = () => {
  const onSearch = debounce((searchTerm: string) => {
    console.log(searchTerm);
  }, 250);

  return (
    <>
      <Typography variant="h2" component="h1" gutterBottom align="center">
        Github Repository Search
      </Typography>

      <SearchInput onSearch={onSearch} />

      <RepositoryTable repositories={[]} />
    </>
  );
};

export default Home;
